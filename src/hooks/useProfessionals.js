import { useCallback } from 'react';
import { useLiveQuery } from '@/hooks/useLiveQuery';
import { observeAllUsers, observeProfessionals, observeUser } from '@/services/userService';
/** Lista pública de profissionais aprovados. */
export const useProfessionals = () => {
    const subscribe = useCallback((cb) => observeProfessionals(cb), []);
    return useLiveQuery(subscribe, []);
};
/** Um profissional específico (página de perfil público). */
export const useProfessional = (professionalId) => {
    const subscribe = useCallback((cb) => observeUser(professionalId, cb), [professionalId]);
    const { data, loading } = useLiveQuery(professionalId ? subscribe : null, null, [professionalId]);
    return { data: data?.role === 'professional' ? data : null, loading };
};
/** Todos os utilizadores — usado apenas na área administrativa. */
export const useAllUsers = () => {
    const subscribe = useCallback((cb) => observeAllUsers(cb), []);
    return useLiveQuery(subscribe, []);
};
