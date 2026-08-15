import { useCallback } from 'react';
import { useLiveQuery } from '@/hooks/useLiveQuery';
import { observeAllUsers, observeProfessionals, observeUser } from '@/services/userService';
import type { AppUser, ProfessionalProfile } from '@/types';

/** Lista pública de profissionais aprovados. */
export const useProfessionals = () => {
  const subscribe = useCallback(
    (cb: (list: ProfessionalProfile[]) => void) => observeProfessionals(cb),
    [],
  );
  return useLiveQuery<ProfessionalProfile[]>(subscribe, []);
};

/** Um profissional específico (página de perfil público). */
export const useProfessional = (professionalId?: string) => {
  const subscribe = useCallback(
    (cb: (user: AppUser | null) => void) => observeUser(professionalId as string, cb),
    [professionalId],
  );
  const { data, loading } = useLiveQuery<AppUser | null>(professionalId ? subscribe : null, null, [professionalId]);
  return { data: data?.role === 'professional' ? (data as ProfessionalProfile) : null, loading };
};

/** Todos os utilizadores — usado apenas na área administrativa. */
export const useAllUsers = () => {
  const subscribe = useCallback((cb: (list: AppUser[]) => void) => observeAllUsers(cb), []);
  return useLiveQuery<AppUser[]>(subscribe, []);
};
