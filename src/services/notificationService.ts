import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { COLLECTIONS, db, isFirebaseConfigured } from '@/config/firebase';
import { demoStore, demoSubscribe } from '@/services/demoStore';
import type { AppNotification, NotificationType } from '@/types';
import { sortByDateDesc, uid } from '@/utils';

interface CreateNotificationInput {
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  link?: string;
}

/** Pede permissão ao browser para mostrar notificações nativas. */
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (typeof window === 'undefined' || !('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  if (Notification.permission === 'denied') return false;
  const result = await Notification.requestPermission();
  return result === 'granted';
};

const showNativeNotification = (title: string, body: string): void => {
  if (typeof window === 'undefined' || !('Notification' in window)) return;
  if (Notification.permission !== 'granted') return;
  try {
    new Notification(title, { body, icon: '/logo.svg' });
  } catch {
    /* alguns browsers móveis exigem service worker — ignorado */
  }
};

export const createNotification = async (input: CreateNotificationInput): Promise<void> => {
  const notification: AppNotification = {
    id: uid('not'),
    read: false,
    createdAt: Date.now(),
    ...input,
  };

  if (!isFirebaseConfigured || !db) {
    demoStore.update((database) => {
      database.notifications.unshift(notification);
    });
  } else {
    const { id: _ignored, ...payload } = notification;
    await addDoc(collection(db, COLLECTIONS.notifications), payload);
  }

  showNativeNotification(notification.title, notification.body);
};

export const observeNotifications = (
  userId: string,
  callback: (list: AppNotification[]) => void,
): (() => void) => {
  if (!isFirebaseConfigured || !db) {
    return demoSubscribe(
      (database) => sortByDateDesc(database.notifications.filter((n) => n.userId === userId)),
      callback,
    );
  }
  const q = query(
    collection(db, COLLECTIONS.notifications),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
  );
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as AppNotification));
  });
};

export const markNotificationRead = async (notificationId: string): Promise<void> => {
  if (!isFirebaseConfigured || !db) {
    demoStore.update((database) => {
      const found = database.notifications.find((n) => n.id === notificationId);
      if (found) found.read = true;
    });
    return;
  }
  await updateDoc(doc(db, COLLECTIONS.notifications, notificationId), { read: true });
};

export const markAllNotificationsRead = async (userId: string): Promise<void> => {
  if (!isFirebaseConfigured || !db) {
    demoStore.update((database) => {
      database.notifications.forEach((n) => {
        if (n.userId === userId) n.read = true;
      });
    });
    return;
  }
  const q = query(
    collection(db, COLLECTIONS.notifications),
    where('userId', '==', userId),
    where('read', '==', false),
  );
  const snapshot = await getDocs(q);
  const batch = writeBatch(db);
  snapshot.docs.forEach((d) => batch.update(d.ref, { read: true }));
  await batch.commit();
};
