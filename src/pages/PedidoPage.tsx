import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PedidoPage() {
  const navigate = useNavigate();

  const servico =
    localStorage.getItem("servico_selecionado") ||
    "Serviço";

  const profissional = JSON.parse(
    localStorage.getItem("profissional_selecionado") ||
      "null"
  );

  const cliente = JSON.parse(
    localStorage.getItem("cliente_logado") ||
      "null"
  );

  const [cidade, setCidade] = useState("");
  const [descricao, setDescricao] = useState("");

  function enviarPedido() {
    if (!cliente || !cliente.id) {
      alert(
        "Faça login como cliente para continuar."
      );

      navigate("/login");

      return;
    }

    if (!profissional || !profissional.id) {
      alert(
        "Nenhum profissional foi selecionado. Volte e escolha um profissional."
      );

      navigate("/profissionais");

      return;
    }

    if (!cidade.trim() || !descricao.trim()) {
      alert(
        "Preencha a cidade e a descrição do serviço."
      );

      return;
    }

    try {
      const pedidosSalvos =
        localStorage.getItem(
          "leprime_pedidos"
        );

      const pedidos = pedidosSalvos
        ? JSON.parse(pedidosSalvos)
        : [];

      const novoPedido = {
        id: Date.now(),

        clienteId: String(cliente.id),

        cliente:
          cliente.nome || "Cliente",

        profissionalId:
          String(profissional.id),

        profissional:
          profissional.nome ||
          "Profissional",

        servico: servico,

        cidade:
          cidade.trim(),

        descricao:
          descricao.trim(),

        estado:
          "Pendente",

        valor:
          null,
      };

      const novaLista = [
        ...pedidos,
        novoPedido,
      ];

      localStorage.setItem(
        "leprime_pedidos",
        JSON.stringify(novaLista)
      );

      // Confirma que realmente foi salvo
      const confirmacao =
        localStorage.getItem(
          "leprime_pedidos"
        );

      if (!confirmacao) {
        alert(
          "Não foi possível salvar o pedido."
        );

        return;
      }

      alert(
        `Pedido enviado para ${profissional.nome} com sucesso!`
      );

      // Só limpa depois que o pedido foi salvo
      localStorage.removeItem(
        "profissional_selecionado"
      );

      localStorage.removeItem(
        "servico_selecionado"
      );

      navigate(
        "/painel-cliente"
      );
    } catch (erro) {
      console.error(
        "Erro ao salvar pedido:",
        erro
      );

      alert(
        "Ocorreu um erro ao salvar o pedido."
      );
    }
  }

  return (
    <div
      style={{
        background: "#F5F7F2",
        minHeight: "100vh",
        padding: "30px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "650px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "15px",
          padding: "30px",
          boxShadow:
            "0 3px 15px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            color: "#061B41",
          }}
        >
          Solicitar orçamento
        </h1>

        <h2
          style={{
            color: "#061B41",
          }}
        >
          🔧 {servico}
        </h2>

        {/* PROFISSIONAL ESCOLHIDO */}

        <div
          style={{
            background: "#F5F7F2",
            padding: "18px",
            borderRadius: "10px",
            marginTop: "20px",
            border:
              "1px solid #e0e0e0",
          }}
        >
          <p
            style={{
              margin: "0 0 5px",
            }}
          >
            👷{" "}
            <strong>
              Profissional escolhido:
            </strong>
          </p>

          <p
            style={{
              margin: 0,
              fontSize: "18px",
              fontWeight: "bold",
              color: "#061B41",
            }}
          >
            {profissional?.nome ||
              "Profissional"}
          </p>

          {profissional?.profissao && (
            <p
              style={{
                margin: "5px 0 0",
              }}
            >
              🔧 {profissional.profissao}
            </p>
          )}

          {profissional?.cidade && (
            <p
              style={{
                margin: "5px 0 0",
              }}
            >
              📍 {profissional.cidade}
            </p>
          )}
        </div>

        {/* CIDADE */}

        <div
          style={{
            marginTop: "25px",
          }}
        >
          <label>
            <strong>
              Cidade onde será realizado o serviço
            </strong>
          </label>

          <input
            type="text"
            value={cidade}
            onChange={(e) =>
              setCidade(e.target.value)
            }
            placeholder="Digite sua cidade"
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "12px",
              marginTop: "8px",
              border:
                "1px solid #ccc",
              borderRadius: "8px",
            }}
          />
        </div>

        {/* DESCRIÇÃO */}

        <div
          style={{
            marginTop: "20px",
          }}
        >
          <label>
            <strong>
              Descrição do serviço
            </strong>
          </label>

          <textarea
            value={descricao}
            onChange={(e) =>
              setDescricao(
                e.target.value
              )
            }
            placeholder="Explique o que precisa que seja feito..."
            rows={6}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "12px",
              marginTop: "8px",
              border:
                "1px solid #ccc",
              borderRadius: "8px",
              resize: "vertical",
            }}
          />
        </div>

        {/* ENVIAR */}

        <button
          onClick={enviarPedido}
          style={{
            marginTop: "25px",
            background: "#B8F000",
            color: "#061B41",
            border: "none",
            padding: "13px 25px",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "15px",
            width: "100%",
          }}
        >
          Enviar pedido para este profissional
        </button>

        {/* VOLTAR */}

        <button
          onClick={() =>
            navigate("/profissionais")
          }
          style={{
            marginTop: "12px",
            background: "#061B41",
            color: "#fff",
            border: "none",
            padding: "13px 25px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "15px",
            width: "100%",
          }}
        >
          ← Voltar aos profissionais
        </button>
      </div>
    </div>
  );
}