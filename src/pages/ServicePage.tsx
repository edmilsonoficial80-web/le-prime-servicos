import { useNavigate } from "react-router-dom";

export default function ServicePage() {
  const navigate = useNavigate();

  const servicos = [
    {
      nome: "Eletricista",
      icone: "🔧",
      descricao: "Instalações e reparações elétricas residenciais e comerciais.",
    },
    {
      nome: "Canalizador",
      icone: "🚰",
      descricao: "Reparações hidráulicas, fugas e manutenção.",
    },
    {
      nome: "Pintor",
      icone: "🎨",
      descricao: "Pintura residencial e comercial.",
    },
    {
      nome: "Limpeza",
      icone: "🧹",
      descricao: "Serviços de limpeza para casas e empresas.",
    },
    {
      nome: "Jardinagem",
      icone: "🌳",
      descricao: "Manutenção e cuidados com jardins.",
    },
  ];

  function solicitarOrcamento(servico: string) {
    localStorage.setItem("servico_selecionado", servico);

    const cliente = localStorage.getItem("cliente_logado");

    if (!cliente) {
      navigate("/login");
      return;
    }

    navigate("/pedido");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F5F7F2",
        padding: "30px 20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#061B41",
        }}
      >
        Serviços L&E Prime
      </h1>

      <p style={{ textAlign: "center" }}>
        Escolha o serviço que precisa.
      </p>

      <div
        style={{
          maxWidth: "1100px",
          margin: "30px auto",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px",
        }}
      >
        {servicos.map((servico) => (
          <div
            key={servico.nome}
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "15px",
              boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
            }}
          >
            <div style={{ fontSize: "35px" }}>
              {servico.icone}
            </div>

            <h2 style={{ color: "#061B41" }}>
              {servico.nome}
            </h2>

            <p>{servico.descricao}</p>

            <button
              onClick={() =>
                solicitarOrcamento(servico.nome)
              }
              style={{
                background: "#B8F000",
                color: "#061B41",
                border: "none",
                padding: "12px 18px",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Solicitar orçamento
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}