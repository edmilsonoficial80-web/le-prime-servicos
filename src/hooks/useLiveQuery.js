import { useEffect, useState } from 'react';
/**
 * Liga um subscritor "live" (onSnapshot do Firestore ou store de demonstração)
 * ao ciclo de vida do componente.
 */
export const useLiveQuery = (subscribe, initialValue, deps = []) => {
    const [data, setData] = useState(initialValue);
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
