import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

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

import ComoFuncionaPage from "./pages/ComoFuncionaPage";
import SobreNosPage from "./pages/SobreNosPage";
import ContatoPage from "./pages/ContatoPage";

export default function App() {
  return (
    <HelmetProvider>
      <Helmet>
        {/* Configuração do Ícone e Aplicativo PWA */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#000000" />
      </Helmet>

      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/servicos" element={<ServicePage />} />

          <Route path="/profissionais" element={<ProfissionaisPage />} />

          <Route
            path="/profissionais/:tipo"
            element={<ProfissionaisPage />}
          />

          <Route
            path="/profissional/:id"
            element={<PerfilProfissional />}
          />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/registro" element={<Registro />} />

          <Route
            path="/registro/cliente"
            element={<RegisterClientPage />}
          />

          <Route
            path="/registro/profissional"
            element={<RegisterProfessionalPage />}
          />

          <Route path="/pedido" element={<PedidoPage />} />

          <Route path="/novo-pedido" element={<NovoPedido />} />

          <Route
            path="/painel-cliente"
            element={<PainelCliente />}
          />

          <Route
            path="/painel-profissional"
            element={<PainelProfissional />}
          />

          <Route
            path="/painel-profissional/:id"
            element={<PainelProfissional />}
          />

          <Route
            path="/acesso-profissional"
            element={<AcessoProfissional />}
          />

          <Route path="/admin" element={<AdminPage />} />

          <Route
            path="/como-funciona"
            element={<ComoFuncionaPage />}
          />

          <Route
            path="/sobre-nos"
            element={<SobreNosPage />}
          />

          <Route
            path="/contato"
            element={<ContatoPage />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}