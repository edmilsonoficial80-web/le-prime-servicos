import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { BottomNav } from '@/components/layout/BottomNav';
import { DemoBanner } from '@/components/layout/DemoBanner';

/**
 * Moldura da aplicação: largura de telemóvel, centrada, com aspeto de
 * dispositivo em ecrãs maiores.
 */
export const AppShell = ({ children }: { children: ReactNode }) => (
  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-200 via-ink-100 to-ink-200 md:p-6">
    <div className="app-shell md:h-[900px] md:max-h-[94vh] md:rounded-[2.25rem] md:border md:border-ink-200 md:shadow-2xl">
      {children}
    </div>
  </div>
);

/** Layout das áreas autenticadas (com barra de navegação inferior). */
export const MainLayout = () => (
  <div className="flex h-full flex-col bg-ink-50">
    <DemoBanner />
    <Outlet />
    <BottomNav />
  </div>
);

/** Layout das páginas públicas (autenticação, splash). */
export const PlainLayout = () => (
  <div className="flex h-full flex-col bg-white">
    <DemoBanner />
    <Outlet />
  </div>
);
