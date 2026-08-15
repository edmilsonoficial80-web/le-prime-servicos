import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const navigate = useNavigate();

  const [logado, setLogado] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [avaliacoes, setAvaliacoes] = useState<any[]>([]);

  const [aba, setAba] = useState<
    "resumo" |
    "clientes" |
    "profissionais" |
    "pedidos" |
    "avaliacoes"
  >("resumo");

  const [pedidoSelecionado, setPedidoSelecionado] =
    useState<any>(null);

  const [clienteSelecionado, setClienteSelecionado] =
    useState<any>(null);

  const [profissionalSelecionado, setProfissionalSelecionado] =
    useState<any>(null);

  const [novoStatus, setNovoStatus] =
    useState("A definir");

  const [novoValor, setNovoValor] =
    useState("");

  const [novoProfissionalId, setNovoProfissionalId] =
    useState("");

  /* =========================
     CARREGAR DADOS
     ========================= */

  function carregarDados() {
    try {
      const usuariosSalvos = JSON.parse(
        localStorage.getItem("usuarios") || "[]"
      );

      const pedidosSalvos = JSON.parse(
        localStorage.getItem("pedidos") || "[]"
      );

      const avaliacoesSalvas = JSON.parse(
        localStorage.getItem("avaliacoes") || "[]"
      );

      setUsuarios(
        Array.isArray(usuariosSalvos)
          ? usuariosSalvos
          : []
      );

      setPedidos(
        Array.isArray(pedidosSalvos)
          ? pedidosSalvos
          : []
      );

      setAvaliacoes(
        Array.isArray(avaliacoesSalvas)
          ? avaliacoesSalvas
          : []
      );
    } catch (erro) {
      console.error(
        "Erro ao carregar dados:",
        erro
      );

      setUsuarios([]);
      setPedidos([]);
      setAvaliacoes([]);
    }
  }

  /* =========================
     LOGIN
     ========================= */

  useEffect(() => {
    const admin = localStorage.getItem(
      "admin_logado"
    );

    if (admin === "true") {
      setLogado(true);
      carregarDados();
    }
  }, []);

  function entrar() {
    if (
      email === "admin@leprime.com" &&
      senha === "123456"
    ) {
      localStorage.setItem(
        "admin_logado",
        "true"
      );

      setLogado(true);
      carregarDados();
    } else {
      alert(
        "Login administrador inválido"
      );
    }
  }

  function sair() {
    localStorage.removeItem(
      "admin_logado"
    );

    setLogado(false);
    navigate("/");
  }

  /* =========================
     USUÁRIOS
     ========================= */

  const clientes = usuarios.filter(
    (usuario: any) =>
      usuario.tipo === "cliente"
  );

  const profissionais =
    usuarios.filter(
      (usuario: any) =>
        usuario.tipo === "profissional"
    );

  /* =========================
     ESTADOS
     ========================= */

  const pendentes = pedidos.filter(
    (pedido: any) =>
      pedido.status === "Pendente" ||
      pedido.status === "A definir"
  ).length;

  const andamento = pedidos.filter(
    (pedido: any) =>
      pedido.status === "Em andamento"
  ).length;

  const concluidos = pedidos.filter(
    (pedido: any) =>
      pedido.status === "Concluído"
  ).length;

  /* =========================
     ABRIR PEDIDO
     ========================= */

  function abrirPedido(
    pedido: any
  ) {
    setPedidoSelecionado(
      pedido
    );

    setNovoStatus(
      pedido.status ||
      "A definir"
    );

    setNovoValor(
      pedido.valor ||
      ""
    );

    setNovoProfissionalId(
      pedido.profissionalId
        ? String(
            pedido.profissionalId
          )
        : ""
    );
  }

  function fecharPedido() {
    setPedidoSelecionado(null);
    setNovoStatus("A definir");
    setNovoValor("");
    setNovoProfissionalId("");
  }

  /* =========================
     SALVAR ALTERAÇÕES DO PEDIDO
     ========================= */

  function salvarPedido() {
    if (!pedidoSelecionado) {
      return;
    }

    const profissional =
      profissionais.find(
        (usuario: any) =>
          String(usuario.id) ===
          String(novoProfissionalId)
      );

    const pedidosAtualizados =
      pedidos.map(
        (pedido: any) => {

          if (
            String(pedido.id) !==
            String(
              pedidoSelecionado.id
            )
          ) {
            return pedido;
          }

          return {
            ...pedido,

            status:
              novoStatus,

            valor:
              novoValor ||
              "A definir",

            profissionalId:
              profissional
                ? profissional.id
                : null,

            profissional:
              profissional
                ? profissional.nome
                : "Aguardando profissional",
          };
        }
      );

    localStorage.setItem(
      "pedidos",
      JSON.stringify(
        pedidosAtualizados
      )
    );

    setPedidos(
      pedidosAtualizados
    );

    const atualizado =
      pedidosAtualizados.find(
        (pedido: any) =>
          String(pedido.id) ===
          String(
            pedidoSelecionado.id
          )
      );

    setPedidoSelecionado(
      atualizado
    );

    alert(
      "Pedido atualizado com sucesso! ✅"
    );
  }

  /* =========================
     REMOVER PEDIDO
     ========================= */

  function removerPedido() {
    if (!pedidoSelecionado) {
      return;
    }

    const confirmar =
      window.confirm(
        "Tem certeza que deseja remover este pedido?"
      );

    if (!confirmar) {
      return;
    }

    const atualizados =
      pedidos.filter(
        (pedido: any) =>
          String(pedido.id) !==
          String(
            pedidoSelecionado.id
          )
      );

    localStorage.setItem(
      "pedidos",
      JSON.stringify(
        atualizados
      )
    );

    setPedidos(
      atualizados
    );

    fecharPedido();
  }

  /* =========================
     REMOVER USUÁRIO
     ========================= */

  function removerUsuario(
    usuario: any
  ) {
    const confirmar =
      window.confirm(
        `Tem certeza que deseja remover ${usuario.nome}?`
      );

    if (!confirmar) {
      return;
    }

    const atualizados =
      usuarios.filter(
        (item: any) =>
          String(item.id) !==
          String(usuario.id)
      );

    localStorage.setItem(
      "usuarios",
      JSON.stringify(
        atualizados
      )
    );

    setUsuarios(
      atualizados
    );

    setClienteSelecionado(null);
    setProfissionalSelecionado(null);
  }

  /* =========================
     ESTILO
     ========================= */

  const botaoAba = (
    ativa: boolean
  ) => ({
    background: ativa
      ? "#B7F000"
      : "#061B41",

    color: ativa
      ? "#061B41"
      : "white",

    border: "none",

    padding:
      "12px 18px",

    borderRadius:
      "8px",

    cursor:
      "pointer",

    fontWeight:
      "bold" as const,

    marginRight:
      "8px",

    marginBottom:
      "8px",
  });

  const campo = {
    width: "100%",
    padding: "12px",
    marginTop: "6px",
    marginBottom: "15px",
    borderRadius: "8px",
    border:
      "1px solid #ccc",
    boxSizing:
      "border-box" as const,
  };

  const card = {
    background: "white",
    padding: "22px",
    borderRadius: "15px",
    marginBottom: "18px",
    boxShadow:
      "0 3px 12px rgba(0,0,0,0.08)",
  };

  /* =========================
     LOGIN
     ========================= */

  if (!logado) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f3f5f7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "35px",
            borderRadius: "18px",
            width: "100%",
            maxWidth: "420px",
            boxShadow:
              "0 5px 20px rgba(0,0,0,0.12)",
          }}
        >
          <h1
            style={{
              color: "#061B41",
              marginTop: 0,
            }}
          >
            Login Administrador
          </h1>

          <p>
            Controle da plataforma
            L&E Prime
          </p>

          <label>
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            placeholder="Email"
            style={campo}
          />

          <label>
            Senha
          </label>

          <input
            type="password"
            value={senha}
            onChange={(e) =>
              setSenha(
                e.target.value
              )
            }
            placeholder="Senha"
            style={campo}
          />

          <button
            type="button"
            onClick={entrar}
            style={{
              background: "#061B41",
              color: "white",
              border: "none",
              padding:
                "13px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              width: "100%",
            }}
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  /* =========================
     PAINEL
     ========================= */

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f5f7",
        padding:
          "30px 20px",
        fontFamily:
          "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth:
            "1200px",
          margin: "auto",
        }}
      >
        <header
          style={{
            background:
              "#061B41",
            color: "white",
            padding: "25px",
            borderRadius:
              "16px",
            marginBottom:
              "20px",
          }}
        >
          <h1
            style={{
              marginTop: 0,
            }}
          >
            Painel Administrador
          </h1>

          <p>
            Controle total da
            plataforma L&E Prime
          </p>

          <button
            type="button"
            onClick={sair}
            style={{
              background:
                "#B7F000",
              color:
                "#061B41",
              border: "none",
              padding:
                "10px 18px",
              borderRadius:
                "8px",
              cursor:
                "pointer",
              fontWeight:
                "bold",
            }}
          >
            Sair
          </button>

          <button
            type="button"
            onClick={
              carregarDados
            }
            style={{
              background:
                "white",
              color:
                "#061B41",
              border: "none",
              padding:
                "10px 18px",
              borderRadius:
                "8px",
              cursor:
                "pointer",
              fontWeight:
                "bold",
              marginLeft:
                "10px",
            }}
          >
            🔄 Atualizar
          </button>
        </header>

        {/* ABAS */}

        <div
          style={{
            marginBottom:
              "20px",
          }}
        >
          <button
            type="button"
            onClick={() =>
              setAba("resumo")
            }
            style={botaoAba(
              aba === "resumo"
            )}
          >
            📊 Resumo
          </button>

          <button
            type="button"
            onClick={() =>
              setAba("clientes")
            }
            style={botaoAba(
              aba === "clientes"
            )}
          >
            👥 Clientes
          </button>

          <button
            type="button"
            onClick={() =>
              setAba(
                "profissionais"
              )
            }
            style={botaoAba(
              aba ===
                "profissionais"
            )}
          >
            🔧 Profissionais
          </button>

          <button
            type="button"
            onClick={() =>
              setAba("pedidos")
            }
            style={botaoAba(
              aba === "pedidos"
            )}
          >
            📩 Pedidos
          </button>

          <button
            type="button"
            onClick={() =>
              setAba(
                "avaliacoes"
              )
            }
            style={botaoAba(
              aba ===
                "avaliacoes"
            )}
          >
            ⭐ Avaliações
          </button>
        </div>

        {/* =========================
            RESUMO
            ========================= */}

        {aba === "resumo" && (
          <>
            <div
              style={{
                display:
                  "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(180px,1fr))",
                gap: "15px",
              }}
            >
              <div
                style={card}
              >
                <h2>👥</h2>
                <h3>
                  Clientes
                </h3>
                <strong
                  style={{
                    fontSize:
                      "30px",
                  }}
                >
                  {clientes.length}
                </strong>
              </div>

              <div
                style={card}
              >
                <h2>🔧</h2>
                <h3>
                  Profissionais
                </h3>
                <strong
                  style={{
                    fontSize:
                      "30px",
                  }}
                >
                  {
                    profissionais.length
                  }
                </strong>
              </div>

              <div
                style={card}
              >
                <h2>📩</h2>
                <h3>
                  Pedidos
                </h3>
                <strong
                  style={{
                    fontSize:
                      "30px",
                  }}
                >
                  {pedidos.length}
                </strong>
              </div>

              <div
                style={card}
              >
                <h2>⭐</h2>
                <h3>
                  Avaliações
                </h3>
                <strong
                  style={{
                    fontSize:
                      "30px",
                  }}
                >
                  {
                    avaliacoes.length
                  }
                </strong>
              </div>
            </div>

            <div
              style={card}
            >
              <h2>
                Estados dos pedidos
              </h2>

              <p>
                🟡 Pendentes:
                {" "}
                <strong>
                  {pendentes}
                </strong>
              </p>

              <p>
                🔵 Em andamento:
                {" "}
                <strong>
                  {andamento}
                </strong>
              </p>

              <p>
                🟢 Concluídos:
                {" "}
                <strong>
                  {concluidos}
                </strong>
              </p>
            </div>
          </>
        )}

        {/* =========================
            CLIENTES
            ========================= */}

        {aba === "clientes" && (
          <div
            style={card}
          >
            <h2>
              👥 Clientes
            </h2>

            {clientes.length ===
            0 ? (
              <p>
                Nenhum cliente
                encontrado.
              </p>
            ) : (
              clientes.map(
                (
                  cliente: any
                ) => (
                  <div
                    key={
                      cliente.id
                    }
                    style={{
                      border:
                        "1px solid #ddd",
                      borderRadius:
                        "10px",
                      padding:
                        "18px",
                      marginBottom:
                        "12px",
                    }}
                  >
                    <h3>
                      {
                        cliente.nome
                      }
                    </h3>

                    <p>
                      Email:{" "}
                      {
                        cliente.email ||
                        "Não informado"
                      }
                    </p>

                    <p>
                      Telefone:{" "}
                      {
                        cliente.telefone ||
                        "Não informado"
                      }
                    </p>

                    <p>
                      WhatsApp:{" "}
                      {
                        cliente.whatsapp ||
                        "Não informado"
                      }
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        setClienteSelecionado(
                          cliente
                        )
                      }
                      style={{
                        background:
                          "#061B41",
                        color:
                          "white",
                        border:
                          "none",
                        padding:
                          "10px 15px",
                        borderRadius:
                          "8px",
                        cursor:
                          "pointer",
                      }}
                    >
                      Ver detalhes
                    </button>
                  </div>
                )
              )
            )}
          </div>
        )}

        {/* =========================
            PROFISSIONAIS
            ========================= */}

        {aba ===
          "profissionais" && (
          <div
            style={card}
          >
            <h2>
              🔧 Profissionais
            </h2>

            {profissionais.length ===
            0 ? (
              <p>
                Nenhum profissional
                encontrado.
              </p>
            ) : (
              profissionais.map(
                (
                  profissional: any
                ) => (
                  <div
                    key={
                      profissional.id
                    }
                    style={{
                      border:
                        "1px solid #ddd",
                      borderRadius:
                        "10px",
                      padding:
                        "18px",
                      marginBottom:
                        "12px",
                    }}
                  >
                    <h3>
                      {
                        profissional.nome
                      }
                    </h3>

                    <p>
                      Especialidade:{" "}
                      {
                        profissional.especialidade ||
                        "Não informado"
                      }
                    </p>

                    <p>
                      Zona:{" "}
                      {
                        profissional.zona ||
                        "Não informado"
                      }
                    </p>

                    <p>
                      Email:{" "}
                      {
                        profissional.email ||
                        "Não informado"
                      }
                    </p>

                    <p>
                      Telefone:{" "}
                      {
                        profissional.telefone ||
                        "Não informado"
                      }
                    </p>

                    <p>
                      WhatsApp:{" "}
                      {
                        profissional.whatsapp ||
                        "Não informado"
                      }
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        setProfissionalSelecionado(
                          profissional
                        )
                      }
                      style={{
                        background:
                          "#061B41",
                        color:
                          "white",
                        border:
                          "none",
                        padding:
                          "10px 15px",
                        borderRadius:
                          "8px",
                        cursor:
                          "pointer",
                      }}
                    >
                      Ver detalhes
                    </button>
                  </div>
                )
              )
            )}
          </div>
        )}

        {/* =========================
            PEDIDOS
            ========================= */}

        {aba === "pedidos" && (
          <div
            style={card}
          >
            <h2>
              📩 Controle dos pedidos
            </h2>

            {pedidos.length ===
            0 ? (
              <p>
                Nenhum pedido
                encontrado.
              </p>
            ) : (
              pedidos
                .slice()
                .reverse()
                .map(
                  (
                    pedido: any
                  ) => (
                    <div
                      key={
                        pedido.id
                      }
                      style={{
                        border:
                          "1px solid #ddd",
                        borderRadius:
                          "12px",
                        padding:
                          "20px",
                        marginBottom:
                          "15px",
                      }}
                    >
                      <h3
                        style={{
                          color:
                            "#061B41",
                        }}
                      >
                        {
                          pedido.servico ||
                          "Serviço"
                        }
                      </h3>

                      <p>
                        <strong>
                          Cliente:
                        </strong>{" "}
                        {
                          pedido.cliente ||
                          "Não informado"
                        }
                      </p>

                      <p>
                        <strong>
                          Profissional:
                        </strong>{" "}
                        {
                          pedido.profissional ||
                          "Aguardando profissional"
                        }
                      </p>

                      <p>
                        <strong>
                          Status:
                        </strong>{" "}
                        {
                          pedido.status ||
                          "A definir"
                        }
                      </p>

                      <p>
                        <strong>
                          Valor:
                        </strong>{" "}
                        {
                          pedido.valor ||
                          "A definir"
                        }
                      </p>

                      <p>
                        <strong>
                          Local:
                        </strong>{" "}
                        {
                          pedido.local ||
                          "Não informado"
                        }
                      </p>

                      <p>
                        <strong>
                          Data:
                        </strong>{" "}
                        {
                          pedido.data ||
                          "Não informado"
                        }
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          abrirPedido(
                            pedido
                          )
                        }
                        style={{
                          background:
                            "#061B41",
                          color:
                            "white",
                          border:
                            "none",
                          padding:
                            "11px 18px",
                          borderRadius:
                            "8px",
                          cursor:
                            "pointer",
                          fontWeight:
                            "bold",
                        }}
                      >
                        ⚙️ Gerenciar pedido
                      </button>
                    </div>
                  )
                )
            )}
          </div>
        )}

        {/* =========================
            AVALIAÇÕES
            ========================= */}



        {aba ===
          "avaliacoes" && (
          <div
            style={card}
          >
            <h2>
              ⭐ Avaliações
            </h2>

            {avaliacoes.length ===
            0 ? (
              <p>
                Nenhuma avaliação
                encontrada.
              </p>
            ) : (
              avaliacoes.map(
                (
                  avaliacao: any,
                  index: number
                ) => (
                  <div
                    key={
                      avaliacao.id ||
                      index
                    }
                    style={{
                      borderBottom:
                        "1px solid #ddd",
                      padding:
                        "15px 0",
                    }}
                  >
                    <p>
                      Nota:{" "}
                      <strong>
                        {
                          avaliacao.nota
                        }
                      </strong>
                    </p>

                    <p>
                      Cliente:{" "}
                      {
                        avaliacao.cliente ||
                        "Não informado"
                      }
                    </p>

                    <p>
                      Profissional:{" "}
                      {
                        avaliacao.profissional ||
                        "Não informado"
                      }
                    </p>

                    <p>
                      {
                        avaliacao.comentario ||
                        "Sem comentário."
                      }
                    </p>
                  </div>
                )
              )
            )}
          </div>
        )}

        {/* =========================
            MODAL PEDIDO
            ========================= */}

        {pedidoSelecionado && (
          <div
            style={{
              position:
                "fixed",
              inset: 0,
              background:
                "rgba(0,0,0,0.55)",
              display:
                "flex",
              alignItems:
                "center",
              justifyContent:
                "center",
              padding:
                "20px",
              zIndex:
                9999,
            }}
          >
            <div
              style={{
                background:
                  "white",
                width:
                  "100%",
                maxWidth:
                  "650px",
                maxHeight:
                  "90vh",
                overflowY:
                  "auto",
                borderRadius:
                  "16px",
                padding:
                  "25px",
              }}
            >
              <h2
                style={{
                  color:
                    "#061B41",
                  marginTop: 0,
                }}
              >
                ⚙️ Gerenciar pedido
              </h2>

              <p>
                <strong>
                  Serviço:
                </strong>{" "}
                {
                  pedidoSelecionado.servico
                }
              </p>

              <p>
                <strong>
                  Cliente:
                </strong>{" "}
                {
                  pedidoSelecionado.cliente ||
                  "Não informado"
                }
              </p>

              <p>
                <strong>
                  Descrição:
                </strong>{" "}
                {
                  pedidoSelecionado.descricao ||
                  "Não informado"
                }
              </p>

              {/* PROFISSIONAL */}

              <label>
                <strong>
                  Profissional
                </strong>
              </label>

              <select
                value={
                  novoProfissionalId
                }
                onChange={(e) =>
                  setNovoProfissionalId(
                    e.target.value
                  )
                }
                style={campo}
              >
                <option value="">
                  Aguardando profissional
                </option>

                {profissionais.map(
                  (
                    profissional: any
                  ) => (
                    <option
                      key={
                        profissional.id
                      }
                      value={
                        profissional.id
                      }
                    >
                      {
                        profissional.nome
                      }
                      {" — "}
                      {
                        profissional.especialidade ||
                        "Profissional"
                      }
                    </option>
                  )
                )}
              </select>

              {/* VALOR */}

              <label>
                <strong>
                  Valor do serviço
                </strong>
              </label>

              <input
                type="text"
                value={
                  novoValor
                }
                onChange={(e) =>
                  setNovoValor(
                    e.target.value
                  )
                }
                placeholder="Ex: 60 €"
                style={campo}
              />

              {/* STATUS */}

              <label>
                <strong>
                  Status do serviço
                </strong>
              </label>

              <select
                value={
                  novoStatus
                }
                onChange={(e) =>
                  setNovoStatus(
                    e.target.value
                  )
                }
                style={campo}
              >
                <option value="A definir">
                  A definir
                </option>

                <option value="Pendente">
                  Pendente
                </option>

                <option value="Em andamento">
                  Em andamento
                </option>

                <option value="Concluído">
                  Concluído
                </option>
              </select>

              <div
                style={{
                  background:
                    novoStatus ===
                      "Em andamento" ||
                    novoStatus ===
                      "Concluído"
                      ? "#eef8dc"
                      : "#f5f5f5",

                  padding:
                    "15px",

                  borderRadius:
                    "10px",

                  marginBottom:
                    "20px",
                }}
              >
                {(
                  novoStatus ===
                    "Em andamento" ||
                  novoStatus ===
                    "Concluído"
                ) ? (
                  <strong>
                    🔓 Contactos liberados
                  </strong>
                ) : (
                  <strong>
                    🔒 Contactos protegidos
                  </strong>
                )}
              </div>

              <button
                type="button"
                onClick={
                  salvarPedido
                }
                style={{
                  background:
                    "#061B41",
                  color:
                    "white",
                  border:
                    "none",
                  padding:
                    "12px 20px",
                  borderRadius:
                    "8px",
                  cursor:
                    "pointer",
                  fontWeight:
                    "bold",
                }}
              >
                💾 Guardar alterações
              </button>

              <button
                type="button"
                onClick={
                  removerPedido
                }
                style={{
                  background:
                    "#c62828",
                  color:
                    "white",
                  border:
                    "none",
                  padding:
                    "12px 20px",
                  borderRadius:
                    "8px",
                  cursor:
                    "pointer",
                  fontWeight:
                    "bold",
                  marginLeft:
                    "10px",
                }}
              >
                🗑️ Remover
              </button>

              <button
                type="button"
                onClick={
                  fecharPedido
                }
                style={{
                  background:
                    "#ddd",
                  color:
                    "#061B41",
                  border:
                    "none",
                  padding:
                    "12px 20px",
                  borderRadius:
                    "8px",
                  cursor:
                    "pointer",
                  fontWeight:
                    "bold",
                  marginLeft:
                    "10px",
                }}
              >
                Fechar
              </button>
            </div>
          </div>
        )}

        {/* =========================
            MODAL CLIENTE
            ========================= */}

        {clienteSelecionado && (
          <div
            style={{
              position:
                "fixed",
              inset: 0,
              background:
                "rgba(0,0,0,0.55)",
              display:
                "flex",
              alignItems:
                "center",
              justifyContent:
                "center",
              padding:
                "20px",
              zIndex:
                9999,
            }}
          >
            <div
              style={{
                background:
                  "white",
                width:
                  "100%",
                maxWidth:
                  "550px",
                borderRadius:
                  "16px",
                padding:
                  "25px",
              }}
            >
              <h2>
                👤 Cliente
              </h2>

              <p>
                <strong>
                  Nome:
                </strong>{" "}
                {
                  clienteSelecionado.nome
                }
              </p>

              <p>
                <strong>
                  Email:
                </strong>{" "}
                {
                  clienteSelecionado.email ||
                  "Não informado"
                }
              </p>

              <p>
                <strong>
                  Telefone:
                </strong>{" "}
                {
                  clienteSelecionado.telefone ||
                  "Não informado"
                }
              </p>

              <p>
                <strong>
                  WhatsApp:
                </strong>{" "}
                {
                  clienteSelecionado.whatsapp ||
                  "Não informado"
                }
              </p>

              <button
                type="button"
                onClick={() =>
                  removerUsuario(
                    clienteSelecionado
                  )
                }
                style={{
                  background:
                    "#c62828",
                  color:
                    "white",
                  border:
                    "none",
                  padding:
                    "11px 18px",
                  borderRadius:
                    "8px",
                  cursor:
                    "pointer",
                  fontWeight:
                    "bold",
                }}
              >
                🗑️ Remover cliente
              </button>

              <button
                type="button"
                onClick={() =>
                  setClienteSelecionado(
                    null
                  )
                }
                style={{
                  marginLeft:
                    "10px",
                  padding:
                    "11px 18px",
                  borderRadius:
                    "8px",
                  border:
                    "none",
                  cursor:
                    "pointer",
                }}
              >
                Fechar
              </button>
            </div>
          </div>
        )}

        {/* =========================
            MODAL PROFISSIONAL
            ========================= */}

        {profissionalSelecionado && (
          <div
            style={{
              position:
                "fixed",
              inset: 0,
              background:
                "rgba(0,0,0,0.55)",
              display:
                "flex",
              alignItems:
                "center",
              justifyContent:
                "center",
              padding:
                "20px",
              zIndex:
                9999,
            }}
          >
            <div
              style={{
                background:
                  "white",
                width:
                  "100%",
                maxWidth:
                  "550px",
                borderRadius:
                  "16px",
                padding:
                  "25px",
              }}
            >
              <h2>
                🔧 Profissional
              </h2>

              <p>
                <strong>
                  Nome:
                </strong>{" "}
                {
                  profissionalSelecionado.nome
                }
              </p>

              <p>
                <strong>
                  Especialidade:
                </strong>{" "}
                {
                  profissionalSelecionado.especialidade ||
                  "Não informado"
                }
              </p>

              <p>
                <strong>
                  Zona:
                </strong>{" "}
                {
                  profissionalSelecionado.zona ||
                  "Não informado"
                }
              </p>

              <p>
                <strong>
                  Email:
                </strong>{" "}
                {
                  profissionalSelecionado.email ||
                  "Não informado"
                }
              </p>

              <p>
                <strong>
                  Telefone:
                </strong>{" "}
                {
                  profissionalSelecionado.telefone ||
                  "Não informado"
                }
              </p>

              <p>
                <strong>
                  WhatsApp:
                </strong>{" "}
                {
                  profissionalSelecionado.whatsapp ||
                  "Não informado"
                }
              </p>

              <button
                type="button"
                onClick={() =>
                  removerUsuario(
                    profissionalSelecionado
                  )
                }
                style={{
                  background:
                    "#c62828",
                  color:
                    "white",
                  border:
                    "none",
                  padding:
                    "11px 18px",
                  borderRadius:
                    "8px",
                  cursor:
                    "pointer",
                  fontWeight:
                    "bold",
                }}
              >
                🗑️ Remover profissional
              </button>

              <button
                type="button"
                onClick={() =>
                  setProfissionalSelecionado(
                    null
                  )
                }
                style={{
                  marginLeft:
                    "10px",
                  padding:
                    "11px 18px",
                  borderRadius:
                    "8px",
                  border:
                    "none",
                  cursor:
                    "pointer",
                }}
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}