import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ServicePage from "./pages/ServicePage";
import ProfissionaisPage from "./pages/ProfissionaisPage";
import PerfilProfissional from "./pages/PerfilProfissional";
import LoginPage from "./pages/auth/LoginPage";
import Registro from "./pages/Registro";
import RegisterClientPage from "./pages/auth/RegisterClientPage";
import RegisterProfessionalPage from "./pages/auth/RegisterProfessionalPage";
import NovoPedido from "./pages/NovoPedido";
import PedidoPage from "./pages/PedidoPage";
import PainelCliente from "./pages/PainelClienteTeste";
import PainelProfissional from "./pages/PainelProfissional";
import AcessoProfissional from "./pages/AcessoProfissional";
import AdminPage from "./pages/AdminPage";
export default function App() {
    return (_jsxs(BrowserRouter, { children: [_jsx(Header, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/servicos", element: _jsx(ServicePage, {}) }), _jsx(Route, { path: "/profissionais", element: _jsx(ProfissionaisPage, {}) }), _jsx(Route, { path: "/profissionais/:tipo", element: _jsx(ProfissionaisPage, {}) }), _jsx(Route, { path: "/profissional/:id", element: _jsx(PerfilProfissional, {}) }), _jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/registro", element: _jsx(Registro, {}) }), _jsx(Route, { path: "/registro/cliente", element: _jsx(RegisterClientPage, {}) }), _jsx(Route, { path: "/registro/profissional", element: _jsx(RegisterProfessionalPage, {}) }), _jsx(Route, { path: "/pedido", element: _jsx(PedidoPage, {}) }), _jsx(Route, { path: "/novo-pedido", element: _jsx(NovoPedido, {}) }), _jsx(Route, { path: "/painel-cliente", element: _jsx(PainelCliente, {}) }), _jsx(Route, { path: "/painel-profissional", element: _jsx(PainelProfissional, {}) }), _jsx(Route, { path: "/painel-profissional/:id", element: _jsx(PainelProfissional, {}) }), _jsx(Route, { path: "/acesso-profissional", element: _jsx(AcessoProfissional, {}) }), _jsx(Route, { path: "/admin", element: _jsx(AdminPage, {}) })] })] }));
}
