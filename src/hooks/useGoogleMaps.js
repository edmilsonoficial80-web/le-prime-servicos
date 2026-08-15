import { useEffect, useState } from 'react';
import { GOOGLE_MAPS_API_KEY } from '@/config/firebase';
const SCRIPT_ID = 'leprime-google-maps';
/**
 * Carrega a Google Maps JavaScript API sob demanda.
 * Sem `VITE_GOOGLE_MAPS_API_KEY` devolve `unavailable`, permitindo à UI
 * apresentar um mapa simplificado em vez de falhar.
 */
export const useGoogleMaps = () => {
    const [status, setStatus] = useState(() => {
        if (!GOOGLE_MAPS_API_KEY)
            return 'unavailable';
        if (typeof window !== 'undefined' && window.google?.maps)
            return 'ready';
        return 'idle';
    });
    useEffect(() => {
        if (status === 'unavailable' || status === 'ready')
            return;
        const existing = document.getElementById(SCRIPT_ID);
        if (existing) {
            existing.addEventListener('load', () => setStatus('ready'));
            existing.addEventListener('error', () => setStatus('unavailable'));
            return;
        }
        setStatus('loading');
        const script = document.createElement('script');
        script.id = SCRIPT_ID;
        script.async = true;
        script.defer = true;
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=marker&language=pt-PT&region=PT`;
        script.onload = () => setStatus('ready');
        script.onerror = () => setStatus('unavailable');
        document.head.appendChild(script);
    }, [status]);
    return status;
};
/** Obtém a localização atual do utilizador (opcional, não bloqueia a UI). */
export const useCurrentPosition = () => {
    const [position, setPosition] = useState(null);
    useEffect(() => {
        if (typeof navigator === 'undefined' || !navigator.geolocation)
            return;
        navigator.geolocation.getCurrentPosition((result) => setPosition({ lat: result.coords.latitude, lng: result.coords.longitude }), () => setPosition(null), { enableHighAccuracy: false, timeout: 8000, maximumAge: 600000 });
    }, []);
    return position;
};
