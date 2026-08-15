import { useCallback } from 'react';
import { useLiveQuery } from '@/hooks/useLiveQuery';
import { observeNotifications } from '@/services/notificationService';
import { observeReports } from '@/services/reportService';
import { observeProfessionalReviews } from '@/services/reviewService';
export const useNotifications = (userId) => {
    const subscribe = useCallback((cb) => observeNotifications(userId, cb), [userId]);
    const { data, loading } = useLiveQuery(userId ? subscribe : null, [], [userId]);
    return { data, loading, unreadCount: data.filter((n) => !n.read).length };
};
export const useReviews = (professionalId) => {
    const subscribe = useCallback((cb) => observeProfessionalReviews(professionalId, cb), [professionalId]);
    return useLiveQuery(professionalId ? subscribe : null, [], [professionalId]);
};
export const useReports = () => {
    const subscribe = useCallback((cb) => observeReports(cb), []);
    return useLiveQuery(subscribe, []);
};
