import { useState } from "react";
import { buscarPedidos } from "../data/pedidosStore";

function PainelCliente() {
  const usuario = JSON.parse(
    localStorage.getItem("usuarioLogado") || "{}"
  );

  const [pedidos, setPedidos] = useState<any[]>(
    buscarPedidos()
  );

  const [mostrarPerfil, setMostrarPerfil] =
    useState(false);

  const [mensagemPerfil, setMensagemPerfil] =
    useState("");

  const [perfil, setPerfil] = useState({
    nome: usuario.nome || "",
    email: usuario.email || "",
    telefone: usuario.telefone || "",
    whatsapp: usuario.whatsapp || "",
  });

  const [profissionalSelecionado, setProfissionalSelecionado] =
    useState<any>(null);

  const [contactosLiberados, setContactosLiberados] =
    useState(false);


  function atualizarPedidos() {
    setPedidos(buscarPedidos());
  }


  function abrirNovoPedido() {
    window.location.href = "/novo-pedido";
  }


  function alterarPerfil(
    campo: string,
    valor: string
  ) {
    setPerfil({
      ...perfil,
      [campo]: valor,
    });
  }


  function salvarPerfil(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      const usuarios = JSON.parse(
        localStorage.getItem("usuarios") || "[]"
      );

      const usuariosAtualizados =
        usuarios.map((u: any) => {
          if (
            String(u.id) ===
            String(usuario.id)
          ) {
            return {
              ...u,

              nome: perfil.nome,

              email:
                u.email ||
                perfil.email,

              telefone:
                perfil.telefone,

              whatsapp:
                perfil.whatsapp,
            };
          }

          return u;
        });

      localStorage.setItem(
        "usuarios",
        JSON.stringify(
          usuariosAtualizados
        )
      );


      const usuarioAtualizado = {
        ...usuario,

        nome: perfil.nome,

        email:
          usuario.email ||
          perfil.email,

        telefone:
          perfil.telefone,

        whatsapp:
          perfil.whatsapp,
      };


      localStorage.setItem(
        "usuarioLogado",
        JSON.stringify(
          usuarioAtualizado
        )
      );


      setMensagemPerfil(
        "Perfil atualizado com sucesso! ✅"
      );

    } catch (erro) {
      console.error(
        "Erro ao salvar perfil:",
        erro
      );

      setMensagemPerfil(
        "Não foi possível salvar o perfil."
      );
    }
  }


  function mascararEmail(
    email: string | undefined
  ) {
    if (!email) {
      return "Não informado";
    }

    const partes =
      email.split("@");

    if (partes.length !== 2) {
      return email.substring(0, 4) + "...";
    }

    const nome = partes[0];
    const dominio = partes[1];

    if (nome.length <= 2) {
      return (
        nome +
        "...@" +
        dominio
      );
    }

    const quantidade =
      Math.max(
        2,
        Math.ceil(
          nome.length / 2
        )
      );

    return (
      nome.substring(
        0,
        quantidade
      ) +
      "...@" +
      dominio
    );
  }


  function mascararTelefone(
    telefone: string | undefined
  ) {
    if (!telefone) {
      return "Não informado";
    }

    const texto =
      String(telefone);

    if (texto.length <= 3) {
      return texto + "...";
    }

    const quantidade =
      Math.max(
        3,
        Math.ceil(
          texto.length / 2
        )
      );

    return (
      texto.substring(
        0,
        quantidade
      ) + "..."
    );
  }


  function abrirPerfil(
    profissionalId: any,
    nome: string,
    liberarContactos: boolean
  ) {
    const usuariosSalvos =
      localStorage.getItem(
        "usuarios"
      );

    let usuarios: any[] = [];

    try {
      usuarios = usuariosSalvos
        ? JSON.parse(
            usuariosSalvos
          )
        : [];
    } catch {
      usuarios = [];
    }


    const profissional =
      usuarios.find(
        (u: any) =>
          u.tipo ===
            "profissional" &&
          (
            String(u.id) ===
              String(
                profissionalId
              ) ||
            u.nome === nome
          )
      );


    setContactosLiberados(
      liberarContactos
    );


    if (profissional) {
      setProfissionalSelecionado({
        nome:
          profissional.nome ||
          nome ||
          "Profissional",

        especialidade:
          profissional.especialidade ||
          "Não informado",

        zona:
          profissional.zona ||
          "Não informado",

        descricao:
          profissional.descricao ||
          "Nenhuma descrição cadastrada.",

        email:
          profissional.email ||
          "",

        telefone:
          profissional.telefone ||
          "",

        whatsapp:
          profissional.whatsapp ||
          "",
      });

    } else {

      setProfissionalSelecionado({
        nome:
          nome ||
          "Profissional",

        especialidade:
          "Não informado",

        zona:
          "Não informado",

        descricao:
          "Este profissional ainda não possui um perfil completo cadastrado.",

        email: "",
        telefone: "",
        whatsapp: "",
      });
    }
  }


  function fecharPerfil() {
    setProfissionalSelecionado(
      null
    );

    setContactosLiberados(
      false
    );
  }


  function pedidoLiberaContactos(
    pedido: any
  ) {
    return (
      pedido.status ===
        "Em andamento" ||
      pedido.status ===
        "Concluído"
    );
  }


  const meusPedidos =
    pedidos.filter(
      (pedido: any) =>
        !pedido.clienteId ||
        String(
          pedido.clienteId
        ) ===
          String(usuario.id)
    );


  const campo = {
    width: "100%",
    padding: "12px",
    marginTop: "7px",
    marginBottom: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    boxSizing:
      "border-box" as const,
    fontSize: "15px",
  };


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
          maxWidth: "1000px",
          margin: "auto",
        }}
      >

        <header
          style={{
            background: "#061B41",
            color: "white",
            padding: "30px",
            borderRadius: "18px",
            marginBottom: "20px",
          }}
        >
          <h1
            style={{
              margin: 0,
            }}
          >
            LE Prime Serviços
          </h1>

          <p>
            Bem-vindo,{" "}
            {usuario.nome ||
              "Cliente"}
          </p>
        </header>


        {/* BOTÕES */}

        <button
          type="button"
          onClick={() => {
            setMostrarPerfil(
              !mostrarPerfil
            );

            setMensagemPerfil("");
          }}
          style={{
            background: "#B7F000",
            color: "#061B41",
            border: "none",
            padding:
              "13px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            marginBottom: "15px",
            marginRight: "10px",
          }}
        >
          {mostrarPerfil
            ? "Fechar meu perfil"
            : "Meu perfil"}
        </button>


        <button
          type="button"
          onClick={
            atualizarPedidos
          }
          style={{
            background: "#061B41",
            color: "white",
            border: "none",
            padding:
              "13px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            marginBottom: "25px",
          }}
        >
          Atualizar pedidos
        </button>


        <button
          type="button"
          onClick={
            abrirNovoPedido
          }
          style={{
            background: "#061B41",
            color: "white",
            border: "none",
            padding:
              "13px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            marginBottom: "25px",
            marginLeft: "10px",
          }}
        >
          + Novo pedido
        </button>


        {/* PERFIL DO CLIENTE */}

        {mostrarPerfil && (
          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "15px",
              marginBottom: "30px",
              boxShadow:
                "0 3px 12px rgba(0,0,0,0.08)",
            }}
          >

            <h2
              style={{
                color: "#061B41",
                marginTop: 0,
              }}
            >
              Meu perfil de cliente
            </h2>


            {mensagemPerfil && (
              <p
                style={{
                  fontWeight: "bold",
                  color: "#16803c",
                  background:
                    "#eaf8ef",
                  padding: "12px",
                  borderRadius: "8px",
                }}
              >
                {mensagemPerfil}
              </p>
            )}


            <form
              onSubmit={
                salvarPerfil
              }
            >

              <label>
                Nome completo
              </label>

              <input
                style={campo}
                value={perfil.nome}
                onChange={(e) =>
                  alterarPerfil(
                    "nome",
                    e.target.value
                  )
                }
                required
              />


              <label>
                Email
              </label>

              <input
                type="email"
                style={{
                  ...campo,
                  background:
                    "#f1f1f1",
                }}
                value={
                  perfil.email
                }
                readOnly
              />

              <small
                style={{
                  display:
                    "block",
                  marginTop:
                    "-10px",
                  marginBottom:
                    "16px",
                  color: "#666",
                }}
              >
                O email usado
                no login não
                pode ser alterado
                aqui.
              </small>


              <label>
                Telefone
              </label>

              <input
                type="tel"
                style={campo}
                placeholder="Ex: 912 345 678"
                value={
                  perfil.telefone
                }
                onChange={(e) =>
                  alterarPerfil(
                    "telefone",
                    e.target.value
                  )
                }
              />


              <label>
                WhatsApp
              </label>

              <input
                type="tel"
                style={campo}
                placeholder="Ex: 912 345 678"
                value={
                  perfil.whatsapp
                }
                onChange={(e) =>
                  alterarPerfil(
                    "whatsapp",
                    e.target.value
                  )
                }
              />


              <button
                type="submit"
                style={{
                  background:
                    "#061B41",
                  color: "white",
                  border: "none",
                  padding:
                    "13px 22px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Salvar perfil
              </button>

            </form>

          </div>
        )}


        <h2
          style={{
            color: "#061B41",
          }}
        >
          Meus pedidos
        </h2>


        {meusPedidos.length ===
          0 && (
          <p>
            Nenhum pedido
            encontrado.
          </p>
        )}


        {/* PEDIDOS */}

        {meusPedidos.map(
          (pedido: any) => {

            const liberar =
              pedidoLiberaContactos(
                pedido
              );

            return (
              <div
                key={pedido.id}
                style={{
                  background:
                    "white",
                  padding: "25px",
                  borderRadius:
                    "15px",
                  marginBottom:
                    "20px",
                  boxShadow:
                    "0 3px 12px rgba(0,0,0,0.08)",
                }}
              >

                <h2
                  style={{
                    color:
                      "#061B41",
                  }}
                >
                  {pedido.servico}
                </h2>


                <p>
                  <strong>
                    Descrição:
                  </strong>{" "}
                  {
                    pedido.descricao
                  }
                </p>


                <p>
                  <strong>
                    Profissional:
                  </strong>{" "}
                  {pedido.profissional ||
                    "Aguardando profissional"}
                </p>


                {pedido.profissional &&
                  pedido.profissional !==
                    "Aguardando profissional" && (

                  <button
                    type="button"
                    onClick={() =>
                      abrirPerfil(
                        pedido.profissionalId,
                        pedido.profissional,
                        liberar
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
                      fontWeight:
                        "bold",
                      marginBottom:
                        "15px",
                    }}
                  >
                    Ver perfil profissional
                  </button>
                )}


                <p>
                  <strong>
                    Status:
                  </strong>{" "}
                  {pedido.status}
                </p>


                <p>
                  <strong>
                    Local:
                  </strong>{" "}
                  {pedido.local}
                </p>


                <p>
                  <strong>
                    Data:
                  </strong>{" "}
                  {pedido.data}
                </p>


                <p>
                  <strong>
                    Valor:
                  </strong>{" "}
                  {pedido.valor}
                </p>


                {pedido.profissional &&
                  !liberar && (

                  <div
                    style={{
                      background:
                        "#f5f5f5",
                      padding:
                        "15px",
                      borderRadius:
                        "10px",
                      marginTop:
                        "15px",
                    }}
                  >
                    🔒 Os contactos
                    completos do
                    profissional
                    serão
                    disponibilizados
                    quando o
                    serviço for
                    aceite.
                  </div>
                )}

              </div>
            );
          }
        )}


        {/* PERFIL PROFISSIONAL */}

        {profissionalSelecionado && (
          <div
            style={{
              background:
                "white",
              padding:
                "30px",
              borderRadius:
                "18px",
              marginTop:
                "30px",
              marginBottom:
                "40px",
              boxShadow:
                "0 3px 15px rgba(0,0,0,0.12)",
              border:
                "2px solid #061B41",
            }}
          >

            <h2
              style={{
                color:
                  "#061B41",
                marginTop: 0,
              }}
            >
              Perfil profissional
            </h2>


            <h1
              style={{
                color:
                  "#061B41",
              }}
            >
              {
                profissionalSelecionado.nome
              }
            </h1>


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
                Zona de atendimento:
              </strong>{" "}
              {
                profissionalSelecionado.zona ||
                "Não informado"
              }
            </p>


            <p>
              <strong>
                Sobre o profissional:
              </strong>
            </p>

            <p>
              {
                profissionalSelecionado.descricao ||
                "Nenhuma descrição cadastrada."
              }
            </p>


            <p>
              <strong>
                Avaliação:
              </strong>{" "}
              ⭐ 5.0
            </p>


            <p>
              <strong>
                Serviços realizados:
              </strong>{" "}
              0
            </p>


            {contactosLiberados ? (

              <div
                style={{
                  background:
                    "#eef8dc",
                  padding:
                    "18px",
                  borderRadius:
                    "10px",
                  marginTop:
                    "20px",
                  marginBottom:
                    "20px",
                }}
              >

                <h3
                  style={{
                    color:
                      "#061B41",
                    marginTop:
                      0,
                  }}
                >
                  📞 Contactos do
                  profissional
                </h3>


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

              </div>

            ) : (

              <div
                style={{
                  background:
                    "#f5f5f5",
                  padding:
                    "18px",
                  borderRadius:
                    "10px",
                  marginTop:
                    "20px",
                  marginBottom:
                    "20px",
                }}
              >

                <h3
                  style={{
                    color:
                      "#061B41",
                    marginTop:
                      0,
                  }}
                >
                  📞 Contactos do
                  profissional
                </h3>


                <p>
                  <strong>
                    Email:
                  </strong>{" "}
                  {mascararEmail(
                    profissionalSelecionado.email
                  )}
                </p>


                <p>
                  <strong>
                    Telefone:
                  </strong>{" "}
                  {mascararTelefone(
                    profissionalSelecionado.telefone
                  )}
                </p>


                <p>
                  <strong>
                    WhatsApp:
                  </strong>{" "}
                  {mascararTelefone(
                    profissionalSelecionado.whatsapp
                  )}
                </p>


                <p
                  style={{
                    color:
                      "#666",
                    fontSize:
                      "14px",
                    marginBottom:
                      0,
                  }}
                >
                  🔒 O serviço ainda
                  não foi aceite.
                  Os contactos
                  completos estão
                  protegidos.
                </p>

              </div>
            )}


            <button
              type="button"
              onClick={
                fecharPerfil
              }
              style={{
                background:
                  "#061B41",
                color: "white",
                border: "none",
                padding:
                  "12px 20px",
                borderRadius:
                  "8px",
                cursor: "pointer",
                fontWeight:
                  "bold",
                marginTop:
                  "10px",
              }}
            >
              Fechar perfil
            </button>

          </div>
        )}

      </div>
    </div>
  );
}

export default PainelCliente;