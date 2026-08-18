import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ProfissionaisPage() {
  const { tipo } = useParams();
  const navigate = useNavigate();

  const [pesquisa, setPesquisa] = useState("");
  const [cidade, setCidade] = useState("");

  const dados = localStorage.getItem("leprime_profissionais");

  const profissionais = dados ? JSON.parse(dados) : [];

  function normalizar(valor: any) {
    return String(valor || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  function termosDoTipo(tipoAtual: string | undefined) {
    const tipoNormalizado = normalizar(tipoAtual);

    const mapa: Record<string, string[]> = {
      eletricista: [
        "eletricista",
        "eletrica",
        "eletrico",
        "eletricidade",
      ],
      canalizador: [
        "canalizador",
        "canalizacao",
        "hidraulica",
        "hidraulico",
        "encanador",
      ],
      pintor: [
        "pintor",
        "pintura",
      ],
      limpeza: [
        "limpeza",
        "limpezas",
      ],
      reparacoes: [
        "reparacao",
        "reparacoes",
        "reparos",
        "manutencao",
        "manutencoes",
      ],
      outros: [
        "outros",
        "outro",
      ],
    };

    return mapa[tipoNormalizado] || [tipoNormalizado];
  }

  const cidades = Array.from(
    new Set(
      profissionais
        .map((p: any) => p.cidade || p.zona)
        .filter((c: any) => c)
    )
  ).sort();

  function obterAvaliacoes(profissionalId: any) {
    const avaliacoes = JSON.parse(
      localStorage.getItem("leprime_avaliacoes") || "[]"
    );

    return avaliacoes.filter(
      (a: any) =>
        String(a.profissionalId) === String(profissionalId)
    );
  }

  function mediaProfissional(profissionalId: any) {
    const listaAvaliacoes =
      obterAvaliacoes(profissionalId);

    if (listaAvaliacoes.length === 0) {
      return null;
    }

    const total = listaAvaliacoes.reduce(
      (soma: number, avaliacao: any) =>
        soma + Number(avaliacao.nota || 0),
      0
    );

    return (total / listaAvaliacoes.length).toFixed(1);
  }

  const termosTipo = termosDoTipo(tipo);

  const lista = profissionais.filter((p: any) => {
    const nome = normalizar(p.nome);

    const dadosProfissao = [
      p.profissao,
      p.especialidade,
      p.specialty,
      p.especialidade,
      p.servico,
      p.categoria,
    ]
      .map(normalizar)
      .filter(Boolean);

    const cidadeProfissional = normalizar(
      p.cidade || p.zona
    );

    const termoPesquisa = normalizar(pesquisa);

    const correspondePesquisa =
      !termoPesquisa ||
      nome.includes(termoPesquisa) ||
      dadosProfissao.some((campo: string) =>
        campo.includes(termoPesquisa)
      );

    let correspondeTipo = true;

    if (tipo) {
      if (normalizar(tipo) === "outros") {
        const principais = [
          "eletricista",
          "eletrica",
          "eletrico",
          "eletricidade",
          "canalizador",
          "canalizacao",
          "hidraulica",
          "hidraulico",
          "encanador",
          "pintor",
          "pintura",
          "limpeza",
          "limpezas",
          "reparacao",
          "reparacoes",
          "reparos",
          "manutencao",
          "manutencoes",
        ];

        correspondeTipo =
          dadosProfissao.length === 0 ||
          !dadosProfissao.some((campo: string) =>
            principais.some((categoria) =>
              campo.includes(categoria)
            )
          );
      } else {
        correspondeTipo = dadosProfissao.some(
          (campo: string) =>
            termosTipo.some((termo) =>
              campo.includes(termo)
            )
        );
      }
    }

    const correspondeCidade =
      !cidade ||
      cidadeProfissional === normalizar(cidade);

    return (
      correspondePesquisa &&
      correspondeTipo &&
      correspondeCidade
    );
  });

  return (
    <div
      style={{
        padding: "40px 20px",
        background: "#F5F7F2",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <h1 style={{ color: "#061B41" }}>
          Profissionais L&E Prime
        </h1>

        <p>
          Encontre profissionais para sua obra ou manutenção.
        </p>

        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "15px",
            marginTop: "25px",
            boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h3 style={{ color: "#061B41", marginTop: 0 }}>
            🔧 Procurar profissional
          </h3>

          <input
            type="text"
            placeholder="Nome ou profissão..."
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "13px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontSize: "15px",
            }}
          />

          <div style={{ marginTop: "15px" }}>
            <label>
              <strong>📍 Cidade</strong>
            </label>

            <select
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "13px",
                marginTop: "8px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                background: "#fff",
                fontSize: "15px",
              }}
            >
              <option value="">Todas as cidades</option>

              {cidades.map((nomeCidade: any) => (
                <option
                  key={nomeCidade}
                  value={nomeCidade}
                >
                  {nomeCidade}
                </option>
              ))}
            </select>
          </div>

          {(pesquisa || cidade) && (
            <button
              type="button"
              onClick={() => {
                setPesquisa("");
                setCidade("");
              }}
              style={{
                marginTop: "15px",
                background: "#061B41",
                color: "#fff",
                border: "none",
                padding: "10px 18px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Limpar filtros
            </button>
          )}
        </div>

        <p
          style={{
            marginTop: "25px",
            fontWeight: "bold",
            color: "#061B41",
          }}
        >
          {lista.length}{" "}
          {lista.length === 1
            ? "profissional encontrado"
            : "profissionais encontrados"}
        </p>

        {lista.length === 0 ? (
          <div
            style={{
              marginTop: 20,
              background: "#fff",
              padding: "30px",
              borderRadius: "15px",
            }}
          >
            <h2>Nenhum profissional encontrado</h2>

            <p>
              Não encontramos profissionais nesta categoria.
            </p>

            <button
              type="button"
              onClick={() => navigate("/profissionais")}
              style={{
                marginTop: "10px",
                background: "#B8F000",
                color: "#061B41",
                border: "none",
                padding: "12px 20px",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Ver todos os profissionais
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(280px,1fr))",
              gap: 20,
              marginTop: 20,
            }}
          >
            {lista.map((profissional: any) => {
              const avaliacoes =
                obterAvaliacoes(profissional.id);

              const media =
                mediaProfissional(profissional.id);

              return (
                <div
                  key={profissional.id}
                  style={{
                    background: "#fff",
                    padding: "25px",
                    borderRadius: "15px",
                    boxShadow:
                      "0 3px 12px rgba(0,0,0,0.08)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "18px",
                    }}
                  >
                    {profissional.foto ? (
                      <img
                        src={profissional.foto}
                        alt={`Foto de ${profissional.nome}`}
                        style={{
                          width: "110px",
                          height: "110px",
                          objectFit: "cover",
                          borderRadius: "50%",
                          border: "4px solid #B8F000",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "110px",
                          height: "110px",
                          borderRadius: "50%",
                          background: "#061B41",
                          color: "#B8F000",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "42px",
                          fontWeight: "bold",
                          border: "4px solid #B8F000",
                        }}
                      >
                        {profissional.nome
                          ? profissional.nome
                              .charAt(0)
                              .toUpperCase()
                          : "P"}
                      </div>
                    )}
                  </div>

                  <h2
                    style={{
                      color: "#061B41",
                      textAlign: "center",
                      marginBottom: "10px",
                    }}
                  >
                    {profissional.nome}
                  </h2>

                  <p style={{ textAlign: "center" }}>
                    🔧{" "}
                    {profissional.profissao ||
                      profissional.especialidade ||
                      profissional.specialty ||
                      profissional.servico ||
                      "Profissional"}
                  </p>

                  <p style={{ textAlign: "center" }}>
                    📍{" "}
                    {profissional.cidade ||
                      profissional.zona ||
                      "Localização não informada"}
                  </p>

                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "15px",
                      minHeight: "50px",
                    }}
                  >
                    {media ? (
                      <>
                        <div
                          style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            color: "#061B41",
                          }}
                        >
                          ⭐ {media} / 5
                        </div>

                        <div
                          style={{
                            marginTop: "5px",
                            color: "#555",
                            fontSize: "14px",
                          }}
                        >
                          {avaliacoes.length}{" "}
                          {avaliacoes.length === 1
                            ? "avaliação"
                            : "avaliações"}
                        </div>
                      </>
                    ) : (
                      <span
                        style={{
                          color: "#777",
                          fontSize: "14px",
                        }}
                      >
                        Ainda sem avaliações
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/profissional/${profissional.id}`
                      )
                    }
                    style={{
                      width: "100%",
                      marginTop: "15px",
                      background: "#B8F000",
                      color: "#061B41",
                      border: "none",
                      padding: "13px 20px",
                      borderRadius: "8px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    Ver perfil
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}