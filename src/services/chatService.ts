import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { COLLECTIONS, db, isFirebaseConfigured } from '@/config/firebase';
import { demoStore, demoSubscribe } from '@/services/demoStore';
import { createNotification } from '@/services/notificationService';
import { STORAGE_FOLDERS, uploadFile } from '@/services/storageService';
import type { AppUser, Conversation, ConversationParticipant, Message } from '@/types';
import { truncate, uid } from '@/utils';

const toParticipant = (user: AppUser): ConversationParticipant => ({
  uid: user.uid,
  name: user.name,
  photoURL: user.photoURL,
  role: user.role,
});

const conversationKey = (a: string, b: string, requestId?: string): string =>
  `conv_${[a, b].sort().join('_')}${requestId ? `_${requestId}` : ''}`;

/** Cria (ou reutiliza) a conversa entre dois utilizadores. */
export const ensureConversation = async (
  current: AppUser,
  other: AppUser,
  request?: { id: string; title: string },
): Promise<string> => {
  const id = conversationKey(current.uid, other.uid, request?.id);

  const conversation: Conversation = {
    id,
    requestId: request?.id,
    requestTitle: request?.title,
    participantIds: [current.uid, other.uid],
    participants: [toParticipant(current), toParticipant(other)],
    lastMessage: '',
    lastMessageAt: Date.now(),
    unread: { [current.uid]: 0, [other.uid]: 0 },
  };

  if (!isFirebaseConfigured || !db) {
    demoStore.update((database) => {
      if (!database.conversations.some((c) => c.id === id)) {
        database.conversations.unshift(conversation);
      }
    });
    return id;
  }

  const { id: _ignored, ...payload } = conversation;
  await setDoc(doc(db, COLLECTIONS.conversations, id), payload, { merge: true });
  return id;
};

export const observeConversations = (
  userId: string,
  callback: (list: Conversation[]) => void,
): (() => void) => {
  if (!isFirebaseConfigured || !db) {
    return demoSubscribe(
      (database) =>
        database.conversations
          .filter((c) => c.participantIds.includes(userId))
          .sort((a, b) => b.lastMessageAt - a.lastMessageAt),
      callback,
    );
  }
  const q = query(
    collection(db, COLLECTIONS.conversations),
    where('participantIds', 'array-contains', userId),
    orderBy('lastMessageAt', 'desc'),
  );
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Conversation));
  });
};

export const observeConversation = (
  conversationId: string,
  callback: (conversation: Conversation | null) => void,
): (() => void) => {
  if (!isFirebaseConfigured || !db) {
    return demoSubscribe((database) => database.conversations.find((c) => c.id === conversationId) ?? null, callback);
  }
  return onSnapshot(doc(db, COLLECTIONS.conversations, conversationId), (snapshot) => {
    callback(snapshot.exists() ? ({ id: snapshot.id, ...snapshot.data() } as Conversation) : null);
  });
};

export const observeMessages = (
  conversationId: string,
  callback: (list: Message[]) => void,
): (() => void) => {
  if (!isFirebaseConfigured || !db) {
    return demoSubscribe(
      (database) =>
        database.messages
          .filter((m) => m.conversationId === conversationId)
          .sort((a, b) => a.createdAt - b.createdAt),
      callback,
    );
  }
  const q = query(
    collection(db, COLLECTIONS.messages),
    where('conversationId', '==', conversationId),
    orderBy('createdAt', 'asc'),
  );
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Message));
  });
};

export const sendMessage = async (
  conversation: Conversation,
  senderId: string,
  text: string,
  imageFile?: File | null,
): Promise<void> => {
  const trimmed = text.trim();
  if (!trimmed && !imageFile) return;

  const imageURL = imageFile ? await uploadFile(imageFile, STORAGE_FOLDERS.chat) : undefined;
  const message: Message = {
    id: uid('msg'),
    conversationId: conversation.id,
    senderId,
    text: trimmed,
    imageURL,
    createdAt: Date.now(),
  };

  const recipients = conversation.participantIds.filter((participantId) => participantId !== senderId);
  const preview = trimmed || 'Enviou uma imagem';

  if (!isFirebaseConfigured || !db) {
    demoStore.update((database) => {
      database.messages.push(message);
      const target = database.conversations.find((c) => c.id === conversation.id);
      if (target) {
        target.lastMessage = preview;
        target.lastMessageAt = message.createdAt;
        recipients.forEach((rid) => {
          target.unread[rid] = (target.unread[rid] ?? 0) + 1;
        });
      }
    });
  } else {
    const { id: _ignored, ...payload } = message;
    await addDoc(collection(db, COLLECTIONS.messages), payload);
    const unread = { ...conversation.unread };
    recipients.forEach((rid) => {
      unread[rid] = (unread[rid] ?? 0) + 1;
    });
    await updateDoc(doc(db, COLLECTIONS.conversations, conversation.id), {
      lastMessage: preview,
      lastMessageAt: message.createdAt,
      unread,
    });
  }

  const sender = conversation.participants.find((p) => p.uid === senderId);
  await Promise.all(
    recipients.map((rid) =>
      createNotification({
        userId: rid,
        type: 'message',
        title: 'Nova mensagem',
        body: `${sender?.name ?? 'Utilizador'}: ${truncate(preview, 60)}`,
        link: `/conversas/${conversation.id}`,
      }),
    ),
  );
};

export const markConversationRead = async (conversationId: string, userId: string): Promise<void> => {
  if (!isFirebaseConfigured || !db) {
    demoStore.update((database) => {
      const target = database.conversations.find((c) => c.id === conversationId);
      if (target) target.unread[userId] = 0;
    });
    return;
  }
  await updateDoc(doc(db, COLLECTIONS.conversations, conversationId), { [`unread.${userId}`]: 0 });
};

/** Conta total de mensagens por ler (usado no badge da navegação). */
export const countUnread = (conversations: Conversation[], userId: string): number =>
  conversations.reduce((total, conversation) => total + (conversation.unread?.[userId] ?? 0), 0);

/** Remove as conversas associadas a um pedido eliminado. */
export const deleteConversationsByRequest = async (requestId: string): Promise<void> => {
  if (!isFirebaseConfigured || !db) {
    demoStore.update((database) => {
      const ids = database.conversations.filter((c) => c.requestId === requestId).map((c) => c.id);
      database.conversations = database.conversations.filter((c) => c.requestId !== requestId);
      database.messages = database.messages.filter((m) => !ids.includes(m.conversationId));
    });
    return;
  }
  const snapshot = await getDocs(
    query(collection(db, COLLECTIONS.conversations), where('requestId', '==', requestId)),
  );
  await Promise.all(snapshot.docs.map((d) => updateDoc(d.ref, { requestId: null })));
};
