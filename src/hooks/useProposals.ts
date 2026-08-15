import { useCallback } from 'react';
import { useLiveQuery } from '@/hooks/useLiveQuery';
import {
  observeAllProposals,
  observeClientProposals,
  observeProfessionalProposals,
  observeRequestProposals,
} from '@/services/proposalService';
import type { Proposal } from '@/types';

export const useRequestProposals = (requestId?: string) => {
  const subscribe = useCallback(
    (cb: (list: Proposal[]) => void) => observeRequestProposals(requestId as string, cb),
    [requestId],
  );
  return useLiveQuery<Proposal[]>(requestId ? subscribe : null, [], [requestId]);
};

export const useClientProposals = (clientId?: string) => {
  const subscribe = useCallback(
    (cb: (list: Proposal[]) => void) => observeClientProposals(clientId as string, cb),
    [clientId],
  );
  return useLiveQuery<Proposal[]>(clientId ? subscribe : null, [], [clientId]);
};

export const useProfessionalProposals = (professionalId?: string) => {
  const subscribe = useCallback(
    (cb: (list: Proposal[]) => void) => observeProfessionalProposals(professionalId as string, cb),
    [professionalId],
  );
  return useLiveQuery<Proposal[]>(professionalId ? subscribe : null, [], [professionalId]);
};

export const useAllProposals = () => {
  const subscribe = useCallback((cb: (list: Proposal[]) => void) => observeAllProposals(cb), []);
  return useLiveQuery<Proposal[]>(subscribe, []);
};
