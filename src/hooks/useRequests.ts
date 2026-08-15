import { useCallback } from 'react';
import { useLiveQuery } from '@/hooks/useLiveQuery';
import {
  observeAllRequests,
  observeClientRequests,
  observeOpenRequests,
  observeProfessionalRequests,
  observeRequest,
} from '@/services/requestService';
import type { ServiceRequest } from '@/types';

export const useClientRequests = (clientId?: string) => {
  const subscribe = useCallback(
    (cb: (list: ServiceRequest[]) => void) => observeClientRequests(clientId as string, cb),
    [clientId],
  );
  return useLiveQuery<ServiceRequest[]>(clientId ? subscribe : null, [], [clientId]);
};

export const useOpenRequests = () => {
  const subscribe = useCallback((cb: (list: ServiceRequest[]) => void) => observeOpenRequests(cb), []);
  return useLiveQuery<ServiceRequest[]>(subscribe, []);
};

export const useProfessionalRequests = (professionalId?: string) => {
  const subscribe = useCallback(
    (cb: (list: ServiceRequest[]) => void) => observeProfessionalRequests(professionalId as string, cb),
    [professionalId],
  );
  return useLiveQuery<ServiceRequest[]>(professionalId ? subscribe : null, [], [professionalId]);
};

export const useAllRequests = () => {
  const subscribe = useCallback((cb: (list: ServiceRequest[]) => void) => observeAllRequests(cb), []);
  return useLiveQuery<ServiceRequest[]>(subscribe, []);
};

export const useRequest = (requestId?: string) => {
  const subscribe = useCallback(
    (cb: (request: ServiceRequest | null) => void) => observeRequest(requestId as string, cb),
    [requestId],
  );
  return useLiveQuery<ServiceRequest | null>(requestId ? subscribe : null, null, [requestId]);
};
