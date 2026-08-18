
import { useNavigate } from "react-router-dom";

export default function SobreNosPage() {
  const navigate = useNavigate();

  return (
    <main
      style={{
        minHeight: "calc(100vh - 90px)",
        background: "#F5F7F2",
        padding: "60px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1050px",
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "45px",
              height: "4px",
              background: "#B8F000",
              margin: "0 auto 18px",
            }}
          />

          <h1
            style={{
              color: "#061B41",
              fontSize: "42px",
              fontWeight: 800,
              margin: "0 0 15px",
            }}
          >
            Sobre nós
          </h1>

          <p
            style={{
              color: "#4B5563",
              fontSize: "18px",
              maxWidth: "720px",
              margin: "0 auto 45px",
              lineHeight: 1.6,
            }}
          >
            A L&E Prime nasceu para tornar mais simples, seguro e rápido
            encontrar profissionais para serviços em casas e empresas.
          </p>
        </div>

        <div
          style={{
            background: "#061B41",
            borderRadius: "18px",
            padding: "45px",
            color: "#FFFFFF",
            marginBottom: "30px",
          }}
        >
          <h2
            style={{
              color: "#B8F000",
              fontSize: "28px",
              marginTop: 0,
              marginBottom: "15px",
            }}
          >
            Gerimos serviços. Entregamos soluções.
          </h2>

          <p
            style={{
              fontSize: "17px",
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            A nossa missão é aproximar clientes e profissionais de confiança.
            Queremos facilitar a contratação de serviços, oferecendo uma
            experiência simples desde o pedido até à conclusão do trabalho.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "22px",
          }}
        >
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "15px",
              padding: "30px",
              textAlign: "center",
              boxShadow: "0 5px 18px rgba(0,0,0,0.07)",
            }}
          >
            <h3 style={{ color: "#061B41", fontSize: "20px" }}>
              Confiança
            </h3>
            <p style={{ color: "#4B5563", lineHeight: 1.6 }}>
              Procuramos criar relações baseadas em confiança e transparência.
            </p>
          </div>

          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "15px",
              padding: "30px",
              textAlign: "center",
              boxShadow: "0 5px 18px rgba(0,0,0,0.07)",
            }}
          >
            <h3 style={{ color: "#061B41", fontSize: "20px" }}>
              Simplicidade
            </h3>
            <p style={{ color: "#4B5563", lineHeight: 1.6 }}>
              Tornamos a procura e contratação de serviços mais simples.
            </p>
          </div>

          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "15px",
              padding: "30px",
              textAlign: "center",
              boxShadow: "0 5px 18px rgba(0,0,0,0.07)",
            }}
          >
            <h3 style={{ color: "#061B41", fontSize: "20px" }}>
              Qualidade
            </h3>
            <p style={{ color: "#4B5563", lineHeight: 1.6 }}>
              Queremos aproximar clientes de profissionais preparados para
              realizar bons trabalhos.
            </p>
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            type="button"
            onClick={() => navigate("/servicos")}
            style={{
              marginTop: "40px",
              background: "#B8F000",
              color: "#061B41",
              border: "none",
              borderRadius: "8px",
              padding: "15px 30px",
              fontSize: "16px",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Ver serviços
          </button>
        </div>
      </div>

      <style>
        {`
          @media (max-width: 800px) {
            main > div > div:nth-of-type(3) {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </main>
  );
}
