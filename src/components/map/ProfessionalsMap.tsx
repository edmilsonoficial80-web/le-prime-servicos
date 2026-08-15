import { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import { useGoogleMaps } from '@/hooks/useGoogleMaps';
import { getCategory } from '@/constants/categories';
import type { GeoPoint, ProfessionalProfile } from '@/types';
import { cn } from '@/utils';

interface ProfessionalsMapProps {
  professionals: ProfessionalProfile[];
  center?: GeoPoint;
  onSelect?: (professional: ProfessionalProfile) => void;
  className?: string;
}

const DEFAULT_CENTER: GeoPoint = { lat: 39.5, lng: -8.2 };

const MAP_STYLES: google.maps.MapTypeStyle[] = [
  { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'road', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
];

/**
 * Mapa com a localização dos profissionais.
 * Sem chave da Google Maps API é apresentado um mapa esquemático equivalente.
 */
export const ProfessionalsMap = ({ professionals, center, onSelect, className }: ProfessionalsMapProps) => {
  const status = useGoogleMaps();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    if (status !== 'ready' || !containerRef.current || !window.google?.maps) return;

    if (!mapRef.current) {
      mapRef.current = new google.maps.Map(containerRef.current, {
        center: center ?? DEFAULT_CENTER,
        zoom: center ? 12 : 7,
        disableDefaultUI: true,
        zoomControl: true,
        styles: MAP_STYLES,
      });
    }

    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = professionals
      .filter((professional) => professional.location)
      .map((professional) => {
        const marker = new google.maps.Marker({
          map: mapRef.current!,
          position: professional.location!,
          title: professional.name,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 9,
            fillColor: getCategory(professional.specialty).color,
            fillOpacity: 1,
            strokeColor: '#111111',
            strokeWeight: 2,
          },
        });
        marker.addListener('click', () => onSelect?.(professional));
        return marker;
      });

    return () => {
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];
    };
  }, [status, professionals, center, onSelect]);

  if (status === 'ready') {
    return <div ref={containerRef} className={cn('h-full w-full', className)} aria-label="Mapa de profissionais" />;
  }

  return (
    <div className={cn('relative h-full w-full overflow-hidden bg-ink-100', className)}>
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(rgba(17,17,17,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,0.06) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {professionals.slice(0, 12).map((professional, index) => {
        const category = getCategory(professional.specialty);
        const top = 12 + ((index * 37) % 70);
        const left = 10 + ((index * 53) % 76);
        return (
          <button
            key={professional.uid}
            type="button"
            onClick={() => onSelect?.(professional)}
            className="absolute -translate-x-1/2 -translate-y-full transition-transform active:scale-95"
            style={{ top: `${top}%`, left: `${left}%` }}
            aria-label={professional.name}
          >
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink-900 shadow-card"
              style={{ backgroundColor: category.color }}
            >
              <MapPin size={16} className="text-ink-900" />
            </span>
          </button>
        );
      })}

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-ink-900/85 px-3 py-1.5 text-[11px] font-medium text-white/80 backdrop-blur">
        {status === 'unavailable'
          ? 'Mapa simplificado — adicione VITE_GOOGLE_MAPS_API_KEY'
          : 'A carregar o Google Maps…'}
      </div>
    </div>
  );
};
