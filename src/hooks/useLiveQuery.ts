import { useEffect, useState } from 'react';

type Subscribe<T> = (callback: (value: T) => void) => () => void;

/**
 * Liga um subscritor "live" (onSnapshot do Firestore ou store de demonstração)
 * ao ciclo de vida do componente.
 */
export const useLiveQuery = <T>(
  subscribe: Subscribe<T> | null,
  initialValue: T,
  deps: unknown[] = [],
): { data: T; loading: boolean } => {
  const [data, setData] = useState<T>(initialValue);
  const [loading, setLoading] = useState(Boolean(subscribe));

  useEffect(() => {
    if (!subscribe) {
      setData(initialValue);
      setLoading(false);
      return;
    }
    setLoading(true);
    const unsubscribe = subscribe((value) => {
      setData(value);
      setLoading(false);
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading };
};
