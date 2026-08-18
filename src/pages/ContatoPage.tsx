import { useNavigate } from "react-router-dom";

export default function ContactoPage() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "#0b1329", color: "#ffffff", minHeight: "100vh", paddingBottom: "60px" }}>
      {/* CABEÇALHO DA PÁGINA */}
      <div style={{ textAlign: "center", paddingTop: "60px", paddingBottom: "30px" }}>
        <div
          style={{
            width: "40px",
            height: "4px",
            backgroundColor: "#a3e635",
            margin: "0 auto 16px auto",
            borderRadius: "2px",
          }}
        />
        <h1 style={{ fontSize: "2.5rem", fontWeight: "800", color: "#ffffff", marginBottom: "8px" }}>
          Contacto
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "1rem" }}>
          Estamos aqui para ajudar. Entre em contacto connosco.
        </p>
      </div>

      {/* CARTÕES DE CONTACTO */}
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
          padding: "0 20px",
        }}
      >
        {/* CARD FALE CONNOSCO */}
        <div
          style={{
            backgroundColor: "#111c3a",
            borderRadius: "16px",
            padding: "40px 32px",
            border: "1px solid #1e293b",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h2 style={{ color: "#a3e635", fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>
              Fale connosco
            </h2>
            <p style={{ color: "#cbd5e1", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "32px" }}>
              Se precisa de ajuda, tem alguma dúvida ou pretende saber mais sobre a L&E Prime, entre em contacto connosco.
            </p>

            <div style={{ marginBottom: "20px" }}>
              <span style={{ display: "block", fontWeight: "700", color: "#94a3b8", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Email
              </span>
              <a
                href="mailto:contato@leprimeservico.com"
                style={{ color: "#ffffff", textDecoration: "none", fontSize: "1rem", fontWeight: "500" }}
              >
                contato@leprimeservico.com
              </a>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <span style={{ display: "block", fontWeight: "700", color: "#94a3b8", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Contacto
              </span>
              <a
                href="tel:931784890"
                style={{ color: "#ffffff", textDecoration: "none", fontSize: "1rem", fontWeight: "500" }}
              >
                931 784 890
              </a>
            </div>

            <div>
              <span style={{ display: "block", fontWeight: "700", color: "#94a3b8", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Atendimento
              </span>
              <span style={{ color: "#ffffff", fontSize: "1rem", fontWeight: "500" }}>
                24 horas
              </span>
            </div>
          </div>
        </div>

        {/* CARD PRECISA DE UM PROFISSIONAL */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "40px 32px",
            color: "#0f172a",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h2 style={{ color: "#0f172a", fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>
              Precisa de um profissional?
            </h2>
            <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "32px" }}>
              Encontre profissionais para os serviços que precisa de forma simples e rápida.
            </p>
          </div>

          <button
            onClick={() => navigate("/servicos")}
            style={{
              backgroundColor: "#a3e635",
              color: "#0f172a",
              fontWeight: "700",
              border: "none",
              borderRadius: "8px",
              padding: "14px 24px",
              fontSize: "0.95rem",
              cursor: "pointer",
              width: "fit-content",
            }}
          >
            Procurar serviços
          </button>
        </div>
      </div>

      {/* BOTÃO VOLTAR AO INÍCIO */}
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <button
          onClick={() => navigate("/")}
          style={{
            backgroundColor: "#111c3a",
            color: "#ffffff",
            fontWeight: "600",
            border: "1px solid #1e293b",
            borderRadius: "8px",
            padding: "12px 28px",
            fontSize: "0.95rem",
            cursor: "pointer",
          }}
        >
          Voltar ao início
        </button>
      </div>
    </div>
  );
}