import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from 'react-router-dom';
import { BottomNav } from '@/components/layout/BottomNav';
import { DemoBanner } from '@/components/layout/DemoBanner';
/**
 * Moldura da aplicação: largura de telemóvel, centrada, com aspeto de
 * dispositivo em ecrãs maiores.
 */
export const AppShell = ({ children }) => (_jsx("div", { className: "flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-200 via-ink-100 to-ink-200 md:p-6", children: _jsx("div", { className: "app-shell md:h-[900px] md:max-h-[94vh] md:rounded-[2.25rem] md:border md:border-ink-200 md:shadow-2xl", children: children }) }));
/** Layout das áreas autenticadas (com barra de navegação inferior). */
export const MainLayout = () => (_jsxs("div", { className: "flex h-full flex-col bg-ink-50", children: [_jsx(DemoBanner, {}), _jsx(Outlet, {}), _jsx(BottomNav, {})] }));
/** Layout das páginas públicas (autenticação, splash). */
export const PlainLayout = () => (_jsxs("div", { className: "flex h-full flex-col bg-white", children: [_jsx(DemoBanner, {}), _jsx(Outlet, {})] }));
