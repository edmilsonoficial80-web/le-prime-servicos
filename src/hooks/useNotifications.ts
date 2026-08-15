import { useCallback } from 'react';
import { useLiveQuery } from '@/hooks/useLiveQuery';
import { observeNotifications } from '@/services/notificationService';
import { observeReports } from '@/services/reportService';
import { observeProfessionalReviews } from '@/services/reviewService';
import type { AppNotification, Report, Review } from '@/types';

export const useNotifications = (userId?: string) => {
  const subscribe = useCallback(
    (cb: (list: AppNotification[]) => void) => observeNotifications(userId as string, cb),
    [userId],
  );
  const { data, loading } = useLiveQuery<AppNotification[]>(userId ? subscribe : null, [], [userId]);
  return { data, loading, unreadCount: data.filter((n) => !n.read).length };
};

export const useReviews = (professionalId?: string) => {
  const subscribe = useCallback(
    (cb: (list: Review[]) => void) => observeProfessionalReviews(professionalId as string, cb),
    [professionalId],
  );
  return useLiveQuery<Review[]>(professionalId ? subscribe : null, [], [professionalId]);
};

export const useReports = () => {
  const subscribe = useCallback((cb: (list: Report[]) => void) => observeReports(cb), []);
  return useLiveQuery<Report[]>(subscribe, []);
};
