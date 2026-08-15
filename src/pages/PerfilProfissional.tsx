import { useNavigate, useParams } from "react-router-dom";

export default function PerfilProfissional() {
  const { id } = useParams();
  const navigate = useNavigate();

  const profissionais = JSON.parse(
    localStorage.getItem("leprime_profissionais") || "[]"
  );

  const profissional = profissionais.find(
    (p: any) => String(p.id) === String(id)
  );

  const avaliacoes = JSON.parse(
    localStorage.getItem("leprime_avaliacoes") || "[]"
  );

  const avaliacoesProfissional = profissional
    ? avaliacoes.filter(
        (a: any) =>
          String(a.profissionalId) ===
          String(profissional.id)
      )
    : [];

  const totalNotas = avaliacoesProfissional.reduce(
    (total: number, avaliacao: any) => {
      const nota = Number(avaliacao.nota);

      if (nota >= 1 && nota <= 5) {
        return total + nota;
      }

      return total;
    },
    0
  );

  const media =
    avaliacoesProfissional.length > 0
      ? (
          totalNotas /
          avaliacoesProfissional.length
        ).toFixed(1)
      : "0.0";

  function solicitarOrcamento() {
    if (!profissional) {
      alert("Profissional não encontrado.");
      return;
    }

    const cliente = localStorage.getItem(
      "cliente_logado"
    );

    if (!cliente) {
      navigate("/login");
      return;
    }

    localStorage.setItem(
      "profissional_selecionado",
      JSON.stringify(profissional)
    );

    localStorage.setItem(
      "servico_selecionado",
      profissional.profissao ||
        profissional.servico ||
        "Serviço"
    );

    navigate("/pedido");
  }

  if (!profissional) {
    return (
      <div
        style={{
          padding: "30px",
          background: "#F5F7F2",
          minHeight: "100vh",
        }}
      >
        <h2>
          Profissional não encontrado
        </h2>

        <button
          onClick={() =>
            navigate("/profissionais")
          }
          style={{
            background: "#061B41",
            color: "#fff",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          ← Voltar
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F5F7F2",
        padding: "30px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >

        {/* BOTÃO VOLTAR NO TOPO */}

        <button
          onClick={() =>
            navigate("/profissionais")
          }
          style={{
            marginBottom: "20px",
            background: "#061B41",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ← Voltar
        </button>

        <div
          style={{
            background: "#fff",
            borderRadius: "15px",
            padding: "30px",
            boxShadow:
              "0 3px 15px rgba(0,0,0,0.08)",
          }}
        >

          {/* CABEÇALHO */}

          <div
            style={{
              textAlign: "center",
            }}
          >
            {profissional.foto ? (
              <img
                src={profissional.foto}
                alt={profissional.nome}
                style={{
                  width: "130px",
                  height: "130px",
                  objectFit: "cover",
                  borderRadius: "50%",
                  border:
                    "4px solid #B8F000",
                  marginBottom: "15px",
                }}
              />
            ) : (
              <div
                style={{
                  width: "130px",
                  height: "130px",
                  borderRadius: "50%",
                  background: "#061B41",
                  color: "#B8F000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "50px",
                  fontWeight: "bold",
                  margin:
                    "0 auto 15px",
                }}
              >
                👷
              </div>
            )}

            <h1
              style={{
                color: "#061B41",
                marginBottom: "8px",
              }}
            >
              {profissional.nome}
            </h1>

            <h2
              style={{
                marginTop: "5px",
              }}
            >
              🔧 {profissional.profissao}
            </h2>

            <p>
              📍 {profissional.cidade}
            </p>
          </div>

          {/* AVALIAÇÃO */}

          <div
            style={{
              marginTop: "25px",
              padding: "20px",
              background: "#F5F7F2",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                margin: "0 0 8px",
                color: "#061B41",
              }}
            >
              ⭐ {media} / 5
            </h2>

            <div
              style={{
                fontSize: "25px",
                marginBottom: "8px",
              }}
            >
              {"⭐".repeat(
                Math.max(
                  0,
                  Math.min(
                    5,
                    Math.round(
                      Number(media)
                    )
                  )
                )
              )}
            </div>

            <p
              style={{
                margin: 0,
              }}
            >
              <strong>
                {avaliacoesProfissional.length}
              </strong>{" "}
              {avaliacoesProfissional.length ===
              1
                ? "avaliação"
                : "avaliações"}
            </p>
          </div>

          {/* SOLICITAR ORÇAMENTO */}

          <button
            onClick={solicitarOrcamento}
            style={{
              marginTop: "25px",
              width: "100%",
              background: "#B8F000",
              color: "#061B41",
              border: "none",
              padding: "14px 20px",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Solicitar orçamento
          </button>

          <hr
            style={{
              margin: "30px 0",
              border: "none",
              borderTop:
                "1px solid #ddd",
            }}
          />

          {/* AVALIAÇÕES DOS CLIENTES */}

          <h2
            style={{
              color: "#061B41",
            }}
          >
            Avaliações dos clientes
          </h2>

          {avaliacoesProfissional.length ===
          0 ? (
            <div
              style={{
                background: "#F5F7F2",
                padding: "20px",
                borderRadius: "10px",
                marginTop: "15px",
              }}
            >
              <p>
                Este profissional ainda não
                recebeu avaliações.
              </p>

              <p
                style={{
                  marginBottom: 0,
                }}
              >
                Seja o primeiro cliente a
                avaliar este serviço.
              </p>
            </div>
          ) : (
            avaliacoesProfissional
              .slice()
              .reverse()
              .map((a: any) => {
                const nota = Math.max(
                  1,
                  Math.min(
                    5,
                    Number(a.nota) || 1
                  )
                );

                return (
                  <div
                    key={a.id}
                    style={{
                      borderBottom:
                        "1px solid #ddd",
                      padding: "18px 0",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "20px",
                        marginBottom: "8px",
                      }}
                    >
                      {"⭐".repeat(nota)}
                    </div>

                    <strong
                      style={{
                        color: "#061B41",
                      }}
                    >
                      {a.cliente ||
                        "Cliente"}
                    </strong>

                    <p
                      style={{
                        marginBottom: 0,
                      }}
                    >
                      {a.comentario &&
                      a.comentario.trim()
                        ? a.comentario
                        : "Sem comentário."}
                    </p>
                  </div>
                );
              })
          )}
        </div>
      </div>
    </div>
  );
}