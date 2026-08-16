import { useState } from "react";
import { buscarPedidos } from "../data/pedidosStore";

function PainelProfissional() {
  const usuarioAtual = JSON.parse(
    localStorage.getItem("usuarioLogado") || "{}"
  );

const [pedidos, setPedidos] = useState<any[]>(
  buscarPedidos()
);

const [valoresProposta, setValoresProposta] = useState<{[key:number]: string}>({});

  const [mostrarPerfil, setMostrarPerfil] =
    useState(false);

  const [mensagemPerfil, setMensagemPerfil] =
    useState("");

  const [perfil, setPerfil] = useState({
    nome: usuarioAtual.nome || "",
    email: usuarioAtual.email || "",
    telefone: usuarioAtual.telefone || "",
    whatsapp: usuarioAtual.whatsapp || "",
    especialidade:
      usuarioAtual.especialidade || "",
    zona: usuarioAtual.zona || "",
    descricao:
      usuarioAtual.descricao || "",
  });


  function atualizarPedidos() {
    setPedidos(buscarPedidos());
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
        usuarios.map((usuario: any) => {

          if (
            String(usuario.id) ===
            String(usuarioAtual.id)
          ) {
            return {
              ...usuario,

              nome:
                perfil.nome,

              email:
                usuario.email ||
                perfil.email,

              telefone:
                perfil.telefone,

              whatsapp:
                perfil.whatsapp,

              especialidade:
                perfil.especialidade,

              zona:
                perfil.zona,

              descricao:
                perfil.descricao,
            };
          }

          return usuario;
        });


      localStorage.setItem(
        "usuarios",
        JSON.stringify(
          usuariosAtualizados
        )
      );


      const usuarioAtualizado = {
        ...usuarioAtual,

        nome:
          perfil.nome,

        email:
          usuarioAtual.email ||
          perfil.email,

        telefone:
          perfil.telefone,

        whatsapp:
          perfil.whatsapp,

        especialidade:
          perfil.especialidade,

        zona:
          perfil.zona,

        descricao:
          perfil.descricao,
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


  function atualizarPedido(
    id: number,
    status: string
  ) {

    const profissional =
      JSON.parse(
        localStorage.getItem(
          "usuarioLogado"
        ) || "{}"
      );


    const pedidosAtualizados =
      pedidos.map(
        (pedido: any) =>
          pedido.id === id
            ? {
                ...pedido,

                profissional:
                  profissional.nome ||
                  "Profissional",

                profissionalId:
                  profissional.id ||
                  null,

                status,
              }
            : pedido
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
  }


  function buscarCliente(
    pedido: any
  ) {

    try {

      const usuarios =
        JSON.parse(
          localStorage.getItem(
            "usuarios"
          ) || "[]"
        );


      return usuarios.find(
        (usuario: any) =>
          usuario.tipo ===
            "cliente" &&
          (
            String(
              usuario.id
            ) ===
              String(
                pedido.clienteId
              ) ||
            usuario.nome ===
              pedido.cliente
          )
      );

    } catch {

      return null;
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
      return email.substring(
        0,
        4
      ) + "...";
    }

    const nome =
      partes[0];

    const dominio =
      partes[1];

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
      ) +
      "..."
    );
  }


  const novosPedidos =
    pedidos.filter(
      (pedido: any) =>
        pedido.status ===
        "Pendente"
    );


  const meusServicos =
    pedidos.filter(
      (pedido: any) =>
        String(pedido.profissionalId) ===                         String(usuarioAtual.id) &&
        pedido.status !==
          "Concluído"
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
            background:
              "#061B41",
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
            Painel do Profissional
          </p>

          <p>
            Bem-vindo,{" "}
            {perfil.nome ||
              "Profissional"}
          </p>

        </header>


        {/* BOTÕES */}

        <div
          style={{
            marginBottom:
              "25px",
          }}
        >

          <button
            type="button"
            onClick={() => {
              setMostrarPerfil(
                !mostrarPerfil
              );

              setMensagemPerfil("");
            }}
            style={{
              background:
                "#B7F000",
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
              marginRight:
                "10px",
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
            Atualizar pedidos
          </button>

        </div>


        {/* MEU PERFIL */}

        {mostrarPerfil && (
          <div
            style={{
              background:
                "white",
              padding:
                "25px",
              borderRadius:
                "15px",
              marginBottom:
                "30px",
              boxShadow:
                "0 3px 12px rgba(0,0,0,0.08)",
            }}
          >

            <h2
              style={{
                color:
                  "#061B41",
                marginTop: 0,
              }}
            >
              Meu perfil profissional
            </h2>


            {mensagemPerfil && (
              <p
                style={{
                  fontWeight:
                    "bold",
                  color:
                    "#16803c",
                  background:
                    "#eaf8ef",
                  padding:
                    "12px",
                  borderRadius:
                    "8px",
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
                value={
                  perfil.nome
                }
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


              <label>
                Especialidade
              </label>

              <input
                style={campo}
                placeholder="Ex: Eletricista"
                value={
                  perfil.especialidade
                }
                onChange={(e) =>
                  alterarPerfil(
                    "especialidade",
                    e.target.value
                  )
                }
                required
              />


              <label>
                Zona de atendimento
              </label>

              <input
                style={campo}
                placeholder="Ex: Lisboa e arredores"
                value={
                  perfil.zona
                }
                onChange={(e) =>
                  alterarPerfil(
                    "zona",
                    e.target.value
                  )
                }
                required
              />


              <label>
                Sobre você
              </label>

              <textarea
                style={{
                  ...campo,
                  minHeight:
                    "120px",
                  resize:
                    "vertical",
                }}
                placeholder="Descreva sua experiência"
                value={
                  perfil.descricao
                }
                onChange={(e) =>
                  alterarPerfil(
                    "descricao",
                    e.target.value
                  )
                }
                required
              />


              <button
                type="submit"
                style={{
                  background:
                    "#061B41",
                  color:
                    "white",
                  border:
                    "none",
                  padding:
                    "13px 22px",
                  borderRadius:
                    "8px",
                  cursor:
                    "pointer",
                  fontWeight:
                    "bold",
                }}
              >
                Salvar perfil
              </button>

            </form>

          </div>
        )}


        {/* NOVOS PEDIDOS */}

        <div
          style={{
            background:
              "white",
            padding:
              "25px",
            borderRadius:
              "15px",
            marginBottom:
              "30px",
            boxShadow:
              "0 3px 12px rgba(0,0,0,0.08)",
          }}
        >

          <h2
            style={{
              color:
                "#061B41",
              marginTop: 0,
            }}
          >
            🔔 Novos pedidos
          </h2>


          {novosPedidos.length ===
            0 && (
            <p>
              Nenhum pedido novo
              no momento.
            </p>
          )}


          {novosPedidos.map(
            (pedido: any) => (

              <div
                key={pedido.id}
                style={{
                  border:
                    "1px solid #ddd",
                  padding:
                    "20px",
                  borderRadius:
                    "12px",
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
                  {pedido.servico}
                </h3>


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
                    Cliente:
                  </strong>{" "}
                  {
                    pedido.cliente
                  }
                </p>


                <p>
                  <strong>
                    Local:
                  </strong>{" "}
                  {
                    pedido.local
                  }
                </p>


                <p>
                  <strong>
                    Data:
                  </strong>{" "}
                  {
                    pedido.data
                  }
                </p>


                <p>
  <strong>Valor:</strong>{" "}
  {pedido.valor}
</p>

<p style={{color:"red"}}>
TESTE CAMPO PROPOSTA APARECEU
</p>

<input
  type="number"
  placeholder="Digite o valor da proposta em euros"
  value={valoresProposta[pedido.id] || ""}
  onChange={(e) =>
    setValoresProposta({
      ...valoresProposta,
      [pedido.id]: e.target.value,
    })
  }
  style={{
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
  }}
/>


                <div
  style={{
    background:"#f5f5f5",
                    padding:
                      "12px",
                    borderRadius:
                      "8px",
                    marginTop:
                      "15px",
                    marginBottom:
                      "15px",
                  }}
                >
                  🔒 Os contactos do
                  cliente ficam
                  protegidos até o
                  serviço ser aceite.
                </div>



<button
  type="button"
  onClick={() => {
    const valor = valoresProposta[pedido.id];

    if (!valor) {
      alert("Digite o valor da proposta");
      return;
    }

    const pedidosAtualizados = pedidos.map((p: any) =>
      p.id === pedido.id
        ? {
            ...p,
            valor: `${valor} €`,
            status: "Em andamento",
            profissional:
              usuarioAtual.nome || "Profissional",
            profissionalId:
            String(usuarioAtual.id),
          }
        : p
    );

    localStorage.setItem(
      "pedidos",
      JSON.stringify(pedidosAtualizados)
    );

    setPedidos(pedidosAtualizados);
  }}
  style={{
    background: "#061B41",
    color: "white",
    border: "none",
    padding: "12px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  Enviar proposta
</button>

              </div>
            )
          )}

        </div>


        {/* MEUS SERVIÇOS */}

        <div
          style={{
            background:
              "white",
            padding:
              "25px",
            borderRadius:
              "15px",
            marginBottom:
              "30px",
            boxShadow:
              "0 3px 12px rgba(0,0,0,0.08)",
          }}
        >

          <h2
            style={{
              color:
                "#061B41",
              marginTop: 0,
            }}
          >
            🔧 Meus serviços
          </h2>


          {meusServicos.length ===
            0 && (
            <p>
              Você ainda não
              possui serviços
              em andamento.
            </p>
          )}


          {meusServicos.map(
            (pedido: any) => {

              const cliente =
                buscarCliente(
                  pedido
                );


              return (

                <div
                  key={pedido.id}
                  style={{
                    border:
                      "1px solid #ddd",
                    padding:
                      "20px",
                    borderRadius:
                      "12px",
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
                    {pedido.servico}
                  </h3>


                  <p>
                    <strong>
                      Cliente:
                    </strong>{" "}
                    {
                      pedido.cliente
                    }
                  </p>


                  <p>
                    <strong>
                      Status:
                    </strong>{" "}
                    {
                      pedido.status
                    }
                  </p>


                  <p>
                    <strong>
                      Local:
                    </strong>{" "}
                    {
                      pedido.local
                    }
                  </p>


                  <p>
                    <strong>
                      Data:
                    </strong>{" "}
                    {
                      pedido.data
                    }
                  </p>


                  {/* CONTACTOS DO CLIENTE */}

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
                      📞 Contactos do cliente
                    </h3>


                    <p>
                      <strong>
                        Email:
                      </strong>{" "}
                      {
                        cliente?.email ||
                        "Não informado"
                      }
                    </p>


                    <p>
                      <strong>
                        Telefone:
                      </strong>{" "}
                      {
                        cliente?.telefone ||
                        "Não informado"
                      }
                    </p>


                    <p>
                      <strong>
                        WhatsApp:
                      </strong>{" "}
                      {
                        cliente?.whatsapp ||
                        "Não informado"
                      }
                    </p>

                  </div>


                  <button
                    type="button"
                    onClick={() =>
                      atualizarPedido(
                        pedido.id,
                        "Concluído"
                      )
                    }
                    style={{
                      background:
                        "#B7F000",
                      color:
                        "#061B41",
                      border:
                        "none",
                      padding:
                        "12px 18px",
                      borderRadius:
                        "8px",
                      cursor:
                        "pointer",
                      fontWeight:
                        "bold",
                    }}
                  >
                    Concluir serviço
                  </button>

                </div>
              );
            }
          )}

        </div>

      </div>
    </div>
  );
}

export default PainelProfissional;