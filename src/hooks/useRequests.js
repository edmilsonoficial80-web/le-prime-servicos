import { useCallback } from 'react';
import { useLiveQuery } from '@/hooks/useLiveQuery';
import { observeAllRequests, observeClientRequests, observeOpenRequests, observeProfessionalRequests, observeRequest, } from '@/services/requestService';
export const useClientRequests = (clientId) => {
    const subscribe = useCallback((cb) => observeClientRequests(clientId, cb), [clientId]);
    return useLiveQuery(clientId ? subscribe : null, [], [clientId]);
};
export const useOpenRequests = () => {
    const subscribe = useCallback((cb) => observeOpenRequests(cb), []);
    return useLiveQuery(subscribe, []);
};
export const useProfessionalRequests = (professionalId) => {
    const subscribe = useCallback((cb) => observeProfessionalRequests(professionalId, cb), [professionalId]);
    return useLiveQuery(professionalId ? subscribe : null, [], [professionalId]);
};
export const useAllRequests = () => {
    const subscribe = useCallback((cb) => observeAllRequests(cb), []);
    return useLiveQuery(subscribe, []);
};
export const useRequest = (requestId) => {
    const subscribe = useCallback((cb) => observeRequest(requestId, cb), [requestId]);
    return useLiveQuery(requestId ? subscribe : null, null, [requestId]);
};
