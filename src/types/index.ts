/**
 * Modelos de dados partilhados por toda a aplicação.
 * Espelham as coleções do Firestore descritas no README.
 */

export type UserRole = 'client' | 'professional' | 'admin';

export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export type RequestStatus = 'open' | 'in_progress' | 'completed' | 'cancelled';

export type ProposalStatus = 'pending' | 'accepted' | 'rejected';

export type Urgency = 'low' | 'medium' | 'high';

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface BaseUser {
  uid: string;
  role: UserRole;
  name: string;
  email: string;
  phone: string;
  city: string;
  photoURL?: string;
  blocked?: boolean;
  createdAt: number;
  favorites?: string[];
  location?: GeoPoint;
}

export interface ClientProfile extends BaseUser {
  role: 'client';
}

export interface AdminProfile extends BaseUser {
  role: 'admin';
}

export interface ProfessionalProfile extends BaseUser {
  role: 'professional';
  specialty: string;
  specialties?: string[];
  description: string;
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  completedJobs: number;
  portfolio: string[];
  idDocumentURL?: string;
  approval: ApprovalStatus;
  featured?: boolean;
  earnings?: number;
  hourlyRate?: number;
}

export type AppUser = ClientProfile | ProfessionalProfile | AdminProfile;

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  active: boolean;
  order: number;
}

export interface ServiceRequest {
  id: string;
  clientId: string;
  clientName: string;
  clientPhoto?: string;
  categoryId: string;
  title: string;
  description: string;
  photos: string[];
  address: string;
  location?: GeoPoint;
  date: string;
  urgency: Urgency;
  budget: number;
  status: RequestStatus;
  proposalsCount: number;
  acceptedProposalId?: string;
  professionalId?: string;
  professionalName?: string;
  reviewed?: boolean;
  createdAt: number;
}

export interface Proposal {
  id: string;
  requestId: string;
  requestTitle: string;
  clientId: string;
  professionalId: string;
  professionalName: string;
  professionalPhoto?: string;
  professionalRating: number;
  price: number;
  message: string;
  estimatedDays: number;
  status: ProposalStatus;
  createdAt: number;
}

export interface ConversationParticipant {
  uid: string;
  name: string;
  photoURL?: string;
  role: UserRole;
}

export interface Conversation {
  id: string;
  requestId?: string;
  requestTitle?: string;
  participantIds: string[];
  participants: ConversationParticipant[];
  lastMessage: string;
  lastMessageAt: number;
  unread: Record<string, number>;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  imageURL?: string;
  createdAt: number;
}

export interface Review {
  id: string;
  requestId: string;
  requestTitle: string;
  professionalId: string;
  clientId: string;
  clientName: string;
  clientPhoto?: string;
  rating: number;
  comment: string;
  createdAt: number;
}

export type NotificationType =
  | 'proposal_received'
  | 'proposal_accepted'
  | 'service_accepted'
  | 'message'
  | 'service_completed'
  | 'account_approved'
  | 'system';

export interface AppNotification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  link?: string;
  read: boolean;
  createdAt: number;
}

export type ReportStatus = 'open' | 'resolved' | 'dismissed';

export interface Report {
  id: string;
  reporterId: string;
  reporterName: string;
  targetId: string;
  targetName: string;
  targetType: 'user' | 'request' | 'message';
  reason: string;
  description: string;
  status: ReportStatus;
  createdAt: number;
}

export interface AdminStats {
  totalUsers: number;
  totalClients: number;
  totalProfessionals: number;
  pendingApprovals: number;
  totalRequests: number;
  openRequests: number;
  completedRequests: number;
  totalProposals: number;
  openReports: number;
  volume: number;
}

export interface ClientRegistrationData {
  name: string;
  email: string;
  phone: string;
  city: string;
  password: string;
}

export interface ProfessionalRegistrationData {
  name: string;
  email: string;
  phone: string;
  city: string;
  password: string;
  specialty: string;
  description: string;
  experienceYears: number;
  photoFile?: File | null;
  portfolioFiles?: File[];
  idDocumentFile?: File | null;
}
