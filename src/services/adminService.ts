import { createNotification } from '@/services/notificationService';
import { updateUser } from '@/services/userService';
import type { AdminStats, AppUser, ApprovalStatus, ProfessionalProfile, Proposal, Report, ServiceRequest } from '@/types';

/** Aprova ou rejeita o registo de um profissional. */
export const setProfessionalApproval = async (
  professional: ProfessionalProfile,
  approval: ApprovalStatus,
): Promise<void> => {
  await updateUser(professional.uid, { approval } as Partial<AppUser>);

  await createNotification({
    userId: professional.uid,
    type: 'account_approved',
    title: approval === 'approved' ? 'Conta aprovada' : 'Registo não aprovado',
    body:
      approval === 'approved'
        ? 'O seu perfil profissional foi validado. Já pode receber pedidos!'
        : 'O seu registo não foi aprovado. Reveja os documentos submetidos e contacte o suporte.',
    link: '/profissional',
  });
};

/** Bloqueia ou desbloqueia o acesso de um utilizador. */
export const setUserBlocked = async (user: AppUser, blocked: boolean): Promise<void> => {
  await updateUser(user.uid, { blocked });
  if (blocked) return;
  await createNotification({
    userId: user.uid,
    type: 'system',
    title: 'Conta reativada',
    body: 'A sua conta voltou a estar ativa na LE Prime Serviços.',
  });
};

/** Calcula os indicadores apresentados no painel administrativo. */
export const buildStats = (
  users: AppUser[],
  requests: ServiceRequest[],
  proposals: Proposal[],
  reports: Report[],
): AdminStats => {
  const professionals = users.filter((u): u is ProfessionalProfile => u.role === 'professional');
  const completed = requests.filter((r) => r.status === 'completed');

  return {
    totalUsers: users.length,
    totalClients: users.filter((u) => u.role === 'client').length,
    totalProfessionals: professionals.length,
    pendingApprovals: professionals.filter((p) => p.approval === 'pending').length,
    totalRequests: requests.length,
    openRequests: requests.filter((r) => r.status === 'open').length,
    completedRequests: completed.length,
    totalProposals: proposals.length,
    openReports: reports.filter((r) => r.status === 'open').length,
    volume: completed.reduce((sum, request) => sum + (request.budget ?? 0), 0),
  };
};
