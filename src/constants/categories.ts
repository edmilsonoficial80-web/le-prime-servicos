import type { Category, Urgency, RequestStatus, ProposalStatus } from '@/types';

/** Categorias oficiais da LE Prime Serviços. */
export const CATEGORIES: Category[] = [
  { id: 'eletricista', name: 'Eletricista', icon: 'Zap', color: '#FFC107', active: true, order: 1 },
  { id: 'canalizador', name: 'Canalizador', icon: 'Droplets', color: '#38BDF8', active: true, order: 2 },
  { id: 'pintor', name: 'Pintor', icon: 'PaintRoller', color: '#F472B6', active: true, order: 3 },
  { id: 'pedreiro', name: 'Pedreiro', icon: 'Hammer', color: '#F97316', active: true, order: 4 },
  { id: 'carpinteiro', name: 'Carpinteiro', icon: 'Ruler', color: '#A3702B', active: true, order: 5 },
  { id: 'limpeza', name: 'Limpeza', icon: 'Sparkles', color: '#34D399', active: true, order: 6 },
  { id: 'jardinagem', name: 'Jardinagem', icon: 'Leaf', color: '#22C55E', active: true, order: 7 },
  { id: 'ar-condicionado', name: 'Ar Condicionado', icon: 'Wind', color: '#60A5FA', active: true, order: 8 },
  { id: 'remodelacao', name: 'Remodelação', icon: 'Home', color: '#C084FC', active: true, order: 9 },
  { id: 'serralheiro', name: 'Serralheiro', icon: 'Wrench', color: '#94A3B8', active: true, order: 10 },
  { id: 'tecnico-informatico', name: 'Técnico Informático', icon: 'Laptop', color: '#818CF8', active: true, order: 11 },
  { id: 'outros', name: 'Outros', icon: 'MoreHorizontal', color: '#64748B', active: true, order: 12 },
];

export const getCategory = (id: string): Category =>
  CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[CATEGORIES.length - 1];

export const URGENCY_LABELS: Record<Urgency, string> = {
  low: 'Sem pressa',
  medium: 'Esta semana',
  high: 'Urgente',
};

export const URGENCY_STYLES: Record<Urgency, string> = {
  low: 'bg-ink-100 text-ink-600',
  medium: 'bg-gold-100 text-gold-800',
  high: 'bg-red-100 text-red-700',
};

export const REQUEST_STATUS_LABELS: Record<RequestStatus, string> = {
  open: 'Aberto',
  in_progress: 'Em andamento',
  completed: 'Concluído',
  cancelled: 'Cancelado',
};

export const REQUEST_STATUS_STYLES: Record<RequestStatus, string> = {
  open: 'bg-emerald-100 text-emerald-700',
  in_progress: 'bg-blue-100 text-blue-700',
  completed: 'bg-ink-900 text-brand-yellow',
  cancelled: 'bg-ink-100 text-ink-500',
};

export const PROPOSAL_STATUS_LABELS: Record<ProposalStatus, string> = {
  pending: 'Pendente',
  accepted: 'Aceite',
  rejected: 'Recusada',
};

export const PROPOSAL_STATUS_STYLES: Record<ProposalStatus, string> = {
  pending: 'bg-gold-100 text-gold-800',
  accepted: 'bg-emerald-100 text-emerald-700',
  rejected: 'bg-ink-100 text-ink-500',
};

/** Cidades sugeridas nos formulários. */
export const CITIES = [
  'Lisboa',
  'Porto',
  'Braga',
  'Coimbra',
  'Faro',
  'Aveiro',
  'Setúbal',
  'Funchal',
  'Guimarães',
  'Leiria',
  'Viseu',
  'Évora',
];

export const REPORT_REASONS = [
  'Comportamento abusivo',
  'Fraude ou burla',
  'Trabalho não realizado',
  'Perfil falso',
  'Conteúdo impróprio',
  'Outro motivo',
];

export const BRAND = {
  name: 'LE Prime Serviços',
  tagline: 'Profissionais de confiança, ao seu alcance.',
  black: '#111111',
  yellow: '#FFC107',
  white: '#FFFFFF',
};
