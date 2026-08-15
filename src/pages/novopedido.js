import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    function alterarCampo(campo, valor) {
        setForm({
            ...form,
            [campo]: valor,
        });
    }
    function enviarPedido(e) {
        e.preventDefault();
        const usuarioSalvo = localStorage.getItem("usuarioLogado");
        let usuarioLogado = {};
        if (usuarioSalvo) {
            try {
                usuarioLogado = JSON.parse(usuarioSalvo);
            }
            catch {
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
        boxSizing: "border-box",
        fontSize: "15px",
    };
    return (_jsx("div", { style: {
            minHeight: "100vh",
            background: "#f3f5f7",
            padding: "30px 20px",
            fontFamily: "Arial, sans-serif",
        }, children: _jsxs("div", { style: {
                maxWidth: "700px",
                margin: "auto",
                background: "white",
                padding: "30px",
                borderRadius: "18px",
                boxShadow: "0 3px 15px rgba(0,0,0,0.08)",
            }, children: [_jsx("h1", { style: { color: "#061B41" }, children: "Novo Pedido" }), enviado ? (_jsxs("div", { children: [_jsx("h2", { children: "Pedido enviado com sucesso! \u2705" }), _jsx("p", { children: "Seu pedido foi enviado para profissionais." })] })) : (_jsxs("form", { onSubmit: enviarPedido, children: [_jsx("label", { children: "Servi\u00E7o" }), _jsx("input", { placeholder: "Ex: Limpeza, pintura, eletricista...", style: campo, value: form.servico, onChange: (e) => alterarCampo("servico", e.target.value), required: true }), _jsx("label", { children: "Descri\u00E7\u00E3o do servi\u00E7o" }), _jsx("textarea", { placeholder: "Explique o que precisa ser feito", style: campo, value: form.descricao, onChange: (e) => alterarCampo("descricao", e.target.value), required: true }), _jsx("label", { children: "Local" }), _jsx("input", { placeholder: "Cidade ou morada", style: campo, value: form.local, onChange: (e) => alterarCampo("local", e.target.value), required: true }), _jsx("label", { children: "Data desejada" }), _jsx("input", { type: "date", style: campo, value: form.data, onChange: (e) => alterarCampo("data", e.target.value), required: true }), _jsx("label", { children: "Observa\u00E7\u00F5es" }), _jsx("textarea", { placeholder: "Informa\u00E7\u00F5es adicionais", style: campo, value: form.observacoes, onChange: (e) => alterarCampo("observacoes", e.target.value) }), _jsx("button", { type: "submit", style: {
                                marginTop: "20px",
                                background: "#061B41",
                                color: "white",
                                border: "none",
                                padding: "14px 25px",
                                borderRadius: "10px",
                                cursor: "pointer",
                                fontSize: "16px",
                            }, children: "Enviar pedido" })] }))] }) }));
}
export default NovoPedido;
