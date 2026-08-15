import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate, useLocation } from 'react-router-dom';
import { FullScreenLoader } from '@/components/ui/Feedback';
import { useAuth } from '@/hooks/useAuth';
/** Impede o acesso a rotas privadas e valida o tipo de utilizador. */
export const ProtectedRoute = ({ children, roles }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    if (loading)
        return _jsx(FullScreenLoader, {});
    if (!user)
        return _jsx(Navigate, { to: "/entrar", replace: true, state: { from: location.pathname } });
    if (roles && !roles.includes(user.role)) {
        const fallback = user.role === 'professional' ? '/profissional' : user.role === 'admin' ? '/admin' : '/inicio';
        return _jsx(Navigate, { to: fallback, replace: true });
    }
    return _jsx(_Fragment, { children: children });
};
/** Redireciona utilizadores já autenticados para fora das páginas públicas. */
export const PublicOnlyRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading)
        return _jsx(FullScreenLoader, {});
    if (user) {
        const target = user.role === 'professional' ? '/profissional' : user.role === 'admin' ? '/admin' : '/inicio';
        return _jsx(Navigate, { to: target, replace: true });
    }
    return _jsx(_Fragment, { children: children });
};
