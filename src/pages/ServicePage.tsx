import { useNavigate } from "react-router-dom";

export default function ServicePage() {
  const navigate = useNavigate();

  const servicos = [
    {
      nome: "Elétrica",
      tipo: "eletricista",
      icone: "⚡",
      descricao: "Instalações e reparações elétricas.",
    },
    {
      nome: "Canalização",
      tipo: "canalizador",
      icone: "🚰",
      descricao: "Reparações hidráulicas e canalização.",
    },
    {
      nome: "Pintura",
      tipo: "pintor",
      icone: "🎨",
      descricao: "Pintura residencial e comercial.",
    },
    {
      nome: "Limpeza",
      tipo: "limpeza",
      icone: "🧹",
      descricao: "Limpeza de casas e empresas.",
    },
    {
      nome: "Reparações",
      tipo: "reparacoes",
      icone: "🛠️",
      descricao: "Reparações e manutenção geral.",
    },
    {
      nome: "Outros",
      tipo: "outros",
      icone: "•••",
      descricao: "Outros serviços profissionais.",
    },
  ];

  function selecionarServico(tipo: string) {
    localStorage.setItem("servico_selecionado", tipo);

    navigate(`/profissionais/${tipo}`);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        padding: "40px 20px 80px",
        boxSizing: "border-box",
      }}
    >
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "35px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "3px",
              background: "#B8F000",
              margin: "0 auto 12px",
            }}
          />

          <h1
            style={{
              margin: 0,
              color: "#061B41",
              fontSize: "32px",
              fontWeight: 800,
            }}
          >
            Serviços disponíveis
          </h1>

          <p
            style={{
              marginTop: "10px",
              color: "#6B7280",
              fontSize: "16px",
            }}
          >
            Encontre o serviço que precisa entre as várias categorias
            disponíveis.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "16px",
          }}
        >
          {servicos.map((servico) => (
            <button
              key={servico.tipo}
              type="button"
              onClick={() => selecionarServico(servico.tipo)}
              aria-label={`Selecionar serviço de ${servico.nome}`}
              style={{
                border: "none",
                background: "#ffffff",
                borderRadius: "10px",
                padding: "22px 12px",
                minHeight: "130px",
                cursor: "pointer",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.transform = "translateY(-3px)";
                event.currentTarget.style.boxShadow =
                  "0 5px 16px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.transform = "translateY(0)";
                event.currentTarget.style.boxShadow =
                  "0 2px 10px rgba(0,0,0,0.08)";
              }}
            >
              <span
                style={{
                  fontSize: servico.tipo === "outros" ? "28px" : "30px",
                  lineHeight: 1,
                  marginBottom: "14px",
                  color: "#B8F000",
                  fontWeight: 700,
                }}
              >
                {servico.icone}
              </span>

              <strong
                style={{
                  color: "#061B41",
                  fontSize: "15px",
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                {servico.nome}
              </strong>

              <span
                style={{
                  marginTop: "7px",
                  color: "#6B7280",
                  fontSize: "12px",
                  textAlign: "center",
                  lineHeight: 1.3,
                }}
              >
                {servico.descricao}
              </span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}