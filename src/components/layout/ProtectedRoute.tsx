import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { FullScreenLoader } from '@/components/ui/Feedback';
import { useAuth } from '@/hooks/useAuth';
import type { UserRole } from '@/types';

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: UserRole[];
}

/** Impede o acesso a rotas privadas e valida o tipo de utilizador. */
export const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <FullScreenLoader />;
  if (!user) return <Navigate to="/entrar" replace state={{ from: location.pathname }} />;

  if (roles && !roles.includes(user.role)) {
    const fallback = user.role === 'professional' ? '/profissional' : user.role === 'admin' ? '/admin' : '/inicio';
    return <Navigate to={fallback} replace />;
  }

  return <>{children}</>;
};

/** Redireciona utilizadores já autenticados para fora das páginas públicas. */
export const PublicOnlyRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return <FullScreenLoader />;
  if (user) {
    const target = user.role === 'professional' ? '/profissional' : user.role === 'admin' ? '/admin' : '/inicio';
    return <Navigate to={target} replace />;
  }

  return <>{children}</>;
};
