
import { useNavigate } from "react-router-dom";

export default function ComoFuncionaPage() {
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
          maxWidth: "1100px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
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
          Como funciona
        </h1>

        <p
          style={{
            color: "#4B5563",
            fontSize: "18px",
            margin: "0 auto 50px",
            maxWidth: "700px",
          }}
        >
          Na L&E Prime é simples encontrar profissionais de confiança
          para realizar os serviços que precisa.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "25px",
          }}
        >
          {[
            {
              numero: "01",
              titulo: "Encontre um serviço",
              texto:
                "Escolha o serviço que precisa e encontre profissionais disponíveis para atender o seu pedido.",
            },
            {
              numero: "02",
              titulo: "Receba propostas",
              texto:
                "Profissionais interessados podem enviar propostas com o valor e os detalhes do serviço.",
            },
            {
              numero: "03",
              titulo: "Escolha o profissional",
              texto:
                "Compare as propostas, escolha o profissional que preferir e combine todos os detalhes.",
            },
          ].map((item) => (
            <div
              key={item.numero}
              style={{
                background: "#FFFFFF",
                borderRadius: "16px",
                padding: "35px 25px",
                boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "#061B41",
                  color: "#B8F000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  fontSize: "20px",
                  fontWeight: 800,
                }}
              >
                {item.numero}
              </div>

              <h2
                style={{
                  color: "#061B41",
                  fontSize: "21px",
                  margin: "0 0 12px",
                }}
              >
                {item.titulo}
              </h2>

              <p
                style={{
                  color: "#4B5563",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {item.texto}
              </p>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => navigate("/servicos")}
          style={{
            marginTop: "45px",
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
          Encontrar um serviço
        </button>
      </div>

      <style>
        {`
          @media (max-width: 800px) {
            main > div > div:nth-of-type(2) {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </main>
  );
}
