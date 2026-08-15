import { useCallback } from 'react';
import { useLiveQuery } from '@/hooks/useLiveQuery';
import { observeConversation, observeConversations, observeMessages } from '@/services/chatService';
import type { Conversation, Message } from '@/types';

export const useConversations = (userId?: string) => {
  const subscribe = useCallback(
    (cb: (list: Conversation[]) => void) => observeConversations(userId as string, cb),
    [userId],
  );
  return useLiveQuery<Conversation[]>(userId ? subscribe : null, [], [userId]);
};

export const useConversation = (conversationId?: string) => {
  const subscribe = useCallback(
    (cb: (conversation: Conversation | null) => void) => observeConversation(conversationId as string, cb),
    [conversationId],
  );
  return useLiveQuery<Conversation | null>(conversationId ? subscribe : null, null, [conversationId]);
};

export const useMessages = (conversationId?: string) => {
  const subscribe = useCallback(
    (cb: (list: Message[]) => void) => observeMessages(conversationId as string, cb),
    [conversationId],
  );
  return useLiveQuery<Message[]>(conversationId ? subscribe : null, [], [conversationId]);
};
