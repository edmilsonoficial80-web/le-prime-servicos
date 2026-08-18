
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpeg";

export default function Header() {
  const navigate = useNavigate();

  const cliente = localStorage.getItem("cliente_logado");
  const profissional = localStorage.getItem("profissional_logado");
  const admin = localStorage.getItem("admin_logado");

  const logado = cliente || profissional || admin;

  function sair() {
    localStorage.removeItem("cliente_logado");
    localStorage.removeItem("profissional_logado");
    localStorage.removeItem("admin_logado");

    navigate("/");
  }

  return (
    <header
      style={{
        background: "#ffffff",
        minHeight: "75px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 30px",
        boxSizing: "border-box",
        gap: "20px",
        flexWrap: "wrap",
        borderBottom: "1px solid #e5e7eb",
        boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
        position: "relative",
        zIndex: 100,
      }}
    >
      {/* LOGO */}
      <div
        onClick={() => navigate("/")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          cursor: "pointer",
        }}
      >
        <img
          src={logo}
          alt="L&E Prime"
          style={{
            height: "52px",
            width: "52px",
            borderRadius: "10px",
            objectFit: "cover",
            display: "block",
          }}
        />

        <div>
          <h2
            style={{
              color: "#061B41",
              margin: 0,
              fontSize: "21px",
              fontWeight: "800",
              lineHeight: "1",
              whiteSpace: "nowrap",
            }}
          >
            L&E Prime
          </h2>

          <span
            style={{
              color: "#6b7280",
              fontSize: "11px",
              fontWeight: "500",
            }}
          >
            Serviços profissionais
          </span>
        </div>
      </div>

      {/* NAVEGAÇÃO */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "18px",
          flexWrap: "wrap",
        }}
      >
        <Link
          to="/"
          style={{
            color: "#061B41",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          Início
        </Link>

        <Link
          to="/servicos"
          style={{
            color: "#061B41",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          Serviços
        </Link>

        <Link
          to="/profissionais"
          style={{
            color: "#061B41",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          Profissionais
        </Link>

        {/* COMO FUNCIONA */}
        <Link
          to="/como-funciona"
          style={{
            color: "#061B41",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          Como funciona
        </Link>

        {/* SOBRE NÓS */}
        <Link
          to="/sobre-nos"
          style={{
            color: "#061B41",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          Sobre nós
        </Link>

        {/* CONTATO */}
        <Link
          to="/contato"
          style={{
            color: "#061B41",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          Contato
        </Link>

        {admin && (
          <Link
            to="/admin"
            style={{
              color: "#557000",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Admin
          </Link>
        )}

        {logado ? (
          <button
            type="button"
            onClick={sair}
            style={{
              background: "#061B41",
              color: "#ffffff",
              border: "none",
              padding: "10px 18px",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Sair
          </button>
        ) : (
          <>
            <Link
              to="/login"
              style={{
                color: "#061B41",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Entrar
            </Link>

            <Link
              to="/registro"
              style={{
                background: "#B8F000",
                color: "#061B41",
                textDecoration: "none",
                padding: "10px 18px",
                borderRadius: "8px",
                fontWeight: "bold",
                boxShadow: "0 3px 8px rgba(0,0,0,0.12)",
              }}
            >
              Registrar
            </Link>
          </>
        )}
      </nav>

      <style>
        {`
          @media (max-width: 900px) {
            header {
              padding: 10px 15px !important;
              justify-content: center !important;
            }

            header nav {
              width: 100%;
              gap: 12px !important;
            }
          }
        `}
      </style>
    </header>
  );
}
