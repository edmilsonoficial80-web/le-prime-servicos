/** Utilitários de formatação e helpers genéricos. */

export const cn = (...classes: Array<string | false | null | undefined>): string =>
  classes.filter(Boolean).join(' ');

export const uid = (prefix = 'id'): string =>
  `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);

export const formatDate = (value: number | string): string => {
  const date = typeof value === 'number' ? new Date(value) : new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return '--';
  return new Intl.DateTimeFormat('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
};

export const formatTime = (value: number): string =>
  new Intl.DateTimeFormat('pt-PT', { hour: '2-digit', minute: '2-digit' }).format(new Date(value));

export const timeAgo = (timestamp: number): string => {
  const diff = Date.now() - timestamp;
  const minute = 60_000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < minute) return 'agora mesmo';
  if (diff < hour) return `há ${Math.floor(diff / minute)} min`;
  if (diff < day) return `há ${Math.floor(diff / hour)} h`;
  if (diff < 7 * day) return `há ${Math.floor(diff / day)} d`;
  return formatDate(timestamp);
};

export const initials = (name: string): string =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

export const truncate = (text: string, max = 90): string =>
  text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;

export const isValidEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

export const isValidPhone = (phone: string): boolean => phone.replace(/\D/g, '').length >= 9;

/** Distância aproximada em km entre dois pontos (fórmula de Haversine). */
export const distanceKm = (
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number => {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return Math.round(2 * R * Math.asin(Math.sqrt(h)) * 10) / 10;
};

/** Converte um File em Data URL (usado no modo demonstração). */
export const fileToDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Não foi possível ler o ficheiro.'));
    reader.readAsDataURL(file);
  });

export const sortByDateDesc = <T extends { createdAt: number }>(items: T[]): T[] =>
  [...items].sort((a, b) => b.createdAt - a.createdAt);
