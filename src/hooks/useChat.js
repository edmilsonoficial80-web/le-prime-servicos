import { useCallback } from 'react';
import { useLiveQuery } from '@/hooks/useLiveQuery';
import { observeConversation, observeConversations, observeMessages } from '@/services/chatService';
export const useConversations = (userId) => {
    const subscribe = useCallback((cb) => observeConversations(userId, cb), [userId]);
    return useLiveQuery(userId ? subscribe : null, [], [userId]);
};
export const useConversation = (conversationId) => {
    const subscribe = useCallback((cb) => observeConversation(conversationId, cb), [conversationId]);
    return useLiveQuery(conversationId ? subscribe : null, null, [conversationId]);
};
export const useMessages = (conversationId) => {
    const subscribe = useCallback((cb) => observeMessages(conversationId, cb), [conversationId]);
    return useLiveQuery(conversationId ? subscribe : null, [], [conversationId]);
};
