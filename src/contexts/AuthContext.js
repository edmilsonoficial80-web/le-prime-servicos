import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { isFirebaseConfigured } from '@/config/firebase';
import { logout as logoutService, observeAuth } from '@/services/authService';
import { requestNotificationPermission } from '@/services/notificationService';
export const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const unsubscribe = observeAuth((nextUser) => {
            setUser(nextUser);
            setLoading(false);
        });
        return unsubscribe;
    }, []);
    useEffect(() => {
        if (user)
            void requestNotificationPermission();
    }, [user]);
    const signOut = useCallback(async () => {
        await logoutService();
        setUser(null);
    }, []);
    const value = useMemo(() => ({
        user,
        loading,
        isDemoMode: !isFirebaseConfigured,
        isClient: user?.role === 'client',
        isProfessional: user?.role === 'professional',
        isAdmin: user?.role === 'admin',
        professional: user?.role === 'professional' ? user : null,
        signOut,
    }), [user, loading, signOut]);
    return _jsx(AuthContext.Provider, { value: value, children: children });
};
