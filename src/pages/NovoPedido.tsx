import { useState } from "react";
import { adicionarPedido } from "../data/pedidosStore";

function NovoPedido() {
  const [enviado, setEnviado] = useState(false);

  const [form, setForm] = useState({
    servico: "",
    descricao: "",
    local: "",
    data: "",
    observacoes: "",
  });

  function alterarCampo(campo: string, valor: string) {
    setForm({
      ...form,
      [campo]: valor,
    });
  }

  function enviarPedido(e: React.FormEvent) {
    e.preventDefault();

    const usuarioSalvo = localStorage.getItem("usuarioLogado");

    let usuarioLogado: any = {};

    if (usuarioSalvo) {
      try {
        usuarioLogado = JSON.parse(usuarioSalvo);
      } catch {
        usuarioLogado = {};
      }
    }

    const novoPedido = {
      id: Date.now(),
      cliente: usuarioLogado.nome || "Cliente",
      clienteId: usuarioLogado.id || null,
      servico: form.servico,
      descricao: form.descricao,
      profissional: "Aguardando profissional",
      profissionalId: null,
      local: form.local,
      data: form.data,
      valor: "A definir",
      status: "Pendente",
      observacoes: form.observacoes,
    };

    adicionarPedido(novoPedido);

    setEnviado(true);
  }

  const campo = {
    width: "100%",
    padding: "12px",
    marginTop: "8px",
    marginBottom: "18px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    boxSizing: "border-box" as const,
    fontSize: "15px",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f5f7",
        padding: "30px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "auto",
          background: "white",
          padding: "30px",
          borderRadius: "18px",
          boxShadow: "0 3px 15px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ color: "#061B41" }}>
          Novo Pedido
        </h1>

        {enviado ? (
          <div>
            <h2>
              Pedido enviado com sucesso! ✅
            </h2>

            <p>
              Seu pedido foi enviado para profissionais.
            </p>
          </div>
        ) : (
          <form onSubmit={enviarPedido}>
            <label>Serviço</label>

            <input
              placeholder="Ex: Limpeza, pintura, eletricista..."
              style={campo}
              value={form.servico}
              onChange={(e) =>
                alterarCampo("servico", e.target.value)
              }
              required
            />

            <label>Descrição do serviço</label>

            <textarea
              placeholder="Explique o que precisa ser feito"
              style={campo}
              value={form.descricao}
              onChange={(e) =>
                alterarCampo("descricao", e.target.value)
              }
              required
            />

            <label>Local</label>

            <input
              placeholder="Cidade ou morada"
              style={campo}
              value={form.local}
              onChange={(e) =>
                alterarCampo("local", e.target.value)
              }
              required
            />

            <label>Data desejada</label>

            <input
              type="date"
              style={campo}
              value={form.data}
              onChange={(e) =>
                alterarCampo("data", e.target.value)
              }
              required
            />

            <label>Observações</label>

            <textarea
              placeholder="Informações adicionais"
              style={campo}
              value={form.observacoes}
              onChange={(e) =>
                alterarCampo("observacoes", e.target.value)
              }
            />

            <button
              type="submit"
              style={{
                marginTop: "20px",
                background: "#061B41",
                color: "white",
                border: "none",
                padding: "14px 25px",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Enviar pedido
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default NovoPedido;