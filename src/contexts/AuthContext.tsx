import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { isFirebaseConfigured } from '@/config/firebase';
import { logout as logoutService, observeAuth } from '@/services/authService';
import { requestNotificationPermission } from '@/services/notificationService';
import type { AppUser, ProfessionalProfile } from '@/types';

interface AuthContextValue {
  user: AppUser | null;
  loading: boolean;
  isDemoMode: boolean;
  isClient: boolean;
  isProfessional: boolean;
  isAdmin: boolean;
  professional: ProfessionalProfile | null;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = observeAuth((nextUser) => {
      setUser(nextUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) void requestNotificationPermission();
  }, [user]);

  const signOut = useCallback(async () => {
    await logoutService();
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      isDemoMode: !isFirebaseConfigured,
      isClient: user?.role === 'client',
      isProfessional: user?.role === 'professional',
      isAdmin: user?.role === 'admin',
      professional: user?.role === 'professional' ? (user as ProfessionalProfile) : null,
      signOut,
    }),
    [user, loading, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
