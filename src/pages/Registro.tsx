import { Link } from "react-router-dom";

export default function Registro() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F5F7F2",
        padding: "50px 20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "15px",
          padding: "40px 30px",
          textAlign: "center",
          boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            color: "#061B41",
            marginTop: 0,
          }}
        >
          Criar conta
        </h1>

        <p
          style={{
            color: "#555",
            fontSize: "16px",
          }}
        >
          Escolha o tipo de conta:
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            marginTop: "30px",
            flexWrap: "wrap",
          }}
        >
          <Link
            to="/registro/cliente"
            style={{
              textDecoration: "none",
            }}
          >
            <button
              style={{
                background: "#B8F000",
                color: "#061B41",
                border: "none",
                padding: "14px 22px",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              👤 Criar conta Cliente
            </button>
          </Link>

          <Link
            to="/registro/profissional"
            style={{
              textDecoration: "none",
            }}
          >
            <button
              style={{
                background: "#061B41",
                color: "#fff",
                border: "none",
                padding: "14px 22px",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              🔧 Criar conta Profissional
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}