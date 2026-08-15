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
        background: "#061B41",
        minHeight: "75px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 25px",
        boxSizing: "border-box",
        gap: "20px",
        flexWrap: "wrap",

        /* Linha divisória */
        borderBottom: "1px solid rgba(255,255,255,0.25)",
      }}
    >
      {/* MARCA */}
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
            height: "55px",
            width: "55px",
            borderRadius: "10px",
            objectFit: "cover",
          }}
        />

        <h2
          style={{
            color: "#fff",
            margin: 0,
            fontSize: "22px",
            whiteSpace: "nowrap",
          }}
        >
          L&E Prime
        </h2>
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
            color: "#fff",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          Início
        </Link>

        <Link
          to="/servicos"
          style={{
            color: "#fff",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          Serviços
        </Link>

        <Link
          to="/profissionais"
          style={{
            color: "#fff",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          Profissionais
        </Link>

        {admin && (
          <Link
            to="/admin"
            style={{
              color: "#B8F000",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Admin
          </Link>
        )}

        {logado ? (
          <button
            onClick={sair}
            style={{
              background: "#B8F000",
              color: "#061B41",
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
                color: "#fff",
                textDecoration: "none",
                fontWeight: "500",
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
              }}
            >
              Registrar
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}