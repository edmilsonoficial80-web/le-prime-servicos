
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
  return (
    <BrowserRouter>
      <Header />

      <Routes>

        {/* Página inicial */}
        <Route
          path="/"
          element={<HomePage />}
        />

        {/* Serviços */}
        <Route
          path="/servicos"
          element={<ServicePage />}
        />

        {/* Lista de profissionais */}
        <Route
          path="/profissionais"
          element={<ProfissionaisPage />}
        />

        <Route
          path="/profissionais/:tipo"
          element={<ProfissionaisPage />}
        />

        {/* Perfil profissional */}
        <Route
          path="/profissional/:id"
          element={<PerfilProfissional />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* Registro */}
        <Route
          path="/registro"
          element={<Registro />}
        />

        <Route
          path="/registro/cliente"
          element={<RegisterClientPage />}
        />

        <Route
          path="/registro/profissional"
          element={<RegisterProfessionalPage />}
        />

        {/* Pedido */}
        <Route
          path="/pedido"
          element={<PedidoPage />}
        />

        <Route
          path="/novo-pedido"
          element={<NovoPedido />}
        />

        {/* Painel do cliente */}
        <Route
          path="/painel-cliente"
          element={<PainelCliente />}
        />

        {/* Painel profissional */}
        <Route
          path="/painel-profissional"
          element={<PainelProfissional />}
        />

        <Route
          path="/painel-profissional/:id"
          element={<PainelProfissional />}
        />

        {/* Acesso profissional */}
        <Route
          path="/acesso-profissional"
          element={<AcessoProfissional />}
        />

        {/* Administração */}
        <Route
          path="/admin"
          element={<AdminPage />}
        />

      </Routes>
    </BrowserRouter>
  );
}