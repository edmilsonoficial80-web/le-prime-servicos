import { useCallback } from 'react';
import { useLiveQuery } from '@/hooks/useLiveQuery';
import { observeAllProposals, observeClientProposals, observeProfessionalProposals, observeRequestProposals, } from '@/services/proposalService';
export const useRequestProposals = (requestId) => {
    const subscribe = useCallback((cb) => observeRequestProposals(requestId, cb), [requestId]);
    return useLiveQuery(requestId ? subscribe : null, [], [requestId]);
};
export const useClientProposals = (clientId) => {
    const subscribe = useCallback((cb) => observeClientProposals(clientId, cb), [clientId]);
    return useLiveQuery(clientId ? subscribe : null, [], [clientId]);
};
export const useProfessionalProposals = (professionalId) => {
    const subscribe = useCallback((cb) => observeProfessionalProposals(professionalId, cb), [professionalId]);
    return useLiveQuery(professionalId ? subscribe : null, [], [professionalId]);
};
export const useAllProposals = () => {
    const subscribe = useCallback((cb) => observeAllProposals(cb), []);
    return useLiveQuery(subscribe, []);
};
