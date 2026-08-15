import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { buscarPedidos } from "../data/pedidosStore";
function PainelProfissional() {
    const usuarioAtual = JSON.parse(localStorage.getItem("usuarioLogado") || "{}");
    const [pedidos, setPedidos] = useState(buscarPedidos());
    const [mostrarPerfil, setMostrarPerfil] = useState(false);
    const [mensagemPerfil, setMensagemPerfil] = useState("");
    const [perfil, setPerfil] = useState({
        nome: usuarioAtual.nome || "",
        email: usuarioAtual.email || "",
        telefone: usuarioAtual.telefone || "",
        whatsapp: usuarioAtual.whatsapp || "",
        especialidade: usuarioAtual.especialidade || "",
        zona: usuarioAtual.zona || "",
        descricao: usuarioAtual.descricao || "",
    });
    function atualizarPedidos() {
        setPedidos(buscarPedidos());
    }
    function alterarPerfil(campo, valor) {
        setPerfil({
            ...perfil,
            [campo]: valor,
        });
    }
    function salvarPerfil(e) {
        e.preventDefault();
        try {
            const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
            const usuariosAtualizados = usuarios.map((usuario) => {
                if (String(usuario.id) ===
                    String(usuarioAtual.id)) {
                    return {
                        ...usuario,
                        nome: perfil.nome,
                        email: usuario.email ||
                            perfil.email,
                        telefone: perfil.telefone,
                        whatsapp: perfil.whatsapp,
                        especialidade: perfil.especialidade,
                        zona: perfil.zona,
                        descricao: perfil.descricao,
                    };
                }
                return usuario;
            });
            localStorage.setItem("usuarios", JSON.stringify(usuariosAtualizados));
            const usuarioAtualizado = {
                ...usuarioAtual,
                nome: perfil.nome,
                email: usuarioAtual.email ||
                    perfil.email,
                telefone: perfil.telefone,
                whatsapp: perfil.whatsapp,
                especialidade: perfil.especialidade,
                zona: perfil.zona,
                descricao: perfil.descricao,
            };
            localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAtualizado));
            setMensagemPerfil("Perfil atualizado com sucesso! ✅");
        }
        catch (erro) {
            console.error("Erro ao salvar perfil:", erro);
            setMensagemPerfil("Não foi possível salvar o perfil.");
        }
    }
    function atualizarPedido(id, status) {
        const profissional = JSON.parse(localStorage.getItem("usuarioLogado") || "{}");
        const pedidosAtualizados = pedidos.map((pedido) => pedido.id === id
            ? {
                ...pedido,
                profissional: profissional.nome ||
                    "Profissional",
                profissionalId: profissional.id ||
                    null,
                status,
            }
            : pedido);
        localStorage.setItem("pedidos", JSON.stringify(pedidosAtualizados));
        setPedidos(pedidosAtualizados);
    }
    function buscarCliente(pedido) {
        try {
            const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
            return usuarios.find((usuario) => usuario.tipo ===
                "cliente" &&
                (String(usuario.id) ===
                    String(pedido.clienteId) ||
                    usuario.nome ===
                        pedido.cliente));
        }
        catch {
            return null;
        }
    }
    function mascararEmail(email) {
        if (!email) {
            return "Não informado";
        }
        const partes = email.split("@");
        if (partes.length !== 2) {
            return email.substring(0, 4) + "...";
        }
        const nome = partes[0];
        const dominio = partes[1];
        if (nome.length <= 2) {
            return (nome +
                "...@" +
                dominio);
        }
        const quantidade = Math.max(2, Math.ceil(nome.length / 2));
        return (nome.substring(0, quantidade) +
            "...@" +
            dominio);
    }
    function mascararTelefone(telefone) {
        if (!telefone) {
            return "Não informado";
        }
        const texto = String(telefone);
        if (texto.length <= 3) {
            return texto + "...";
        }
        const quantidade = Math.max(3, Math.ceil(texto.length / 2));
        return (texto.substring(0, quantidade) +
            "...");
    }
    const novosPedidos = pedidos.filter((pedido) => pedido.status ===
        "Pendente");
    const meusServicos = pedidos.filter((pedido) => pedido.profissionalId ===
        usuarioAtual.id &&
        pedido.status !==
            "Concluído");
    const campo = {
        width: "100%",
        padding: "12px",
        marginTop: "7px",
        marginBottom: "16px",
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
                maxWidth: "1000px",
                margin: "auto",
            }, children: [_jsxs("header", { style: {
                        background: "#061B41",
                        color: "white",
                        padding: "30px",
                        borderRadius: "18px",
                        marginBottom: "20px",
                    }, children: [_jsx("h1", { style: {
                                margin: 0,
                            }, children: "LE Prime Servi\u00E7os" }), _jsx("p", { children: "Painel do Profissional" }), _jsxs("p", { children: ["Bem-vindo,", " ", perfil.nome ||
                                    "Profissional"] })] }), _jsxs("div", { style: {
                        marginBottom: "25px",
                    }, children: [_jsx("button", { type: "button", onClick: () => {
                                setMostrarPerfil(!mostrarPerfil);
                                setMensagemPerfil("");
                            }, style: {
                                background: "#B7F000",
                                color: "#061B41",
                                border: "none",
                                padding: "12px 20px",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontWeight: "bold",
                                marginRight: "10px",
                            }, children: mostrarPerfil
                                ? "Fechar meu perfil"
                                : "Meu perfil" }), _jsx("button", { type: "button", onClick: atualizarPedidos, style: {
                                background: "#061B41",
                                color: "white",
                                border: "none",
                                padding: "12px 20px",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontWeight: "bold",
                            }, children: "Atualizar pedidos" })] }), mostrarPerfil && (_jsxs("div", { style: {
                        background: "white",
                        padding: "25px",
                        borderRadius: "15px",
                        marginBottom: "30px",
                        boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
                    }, children: [_jsx("h2", { style: {
                                color: "#061B41",
                                marginTop: 0,
                            }, children: "Meu perfil profissional" }), mensagemPerfil && (_jsx("p", { style: {
                                fontWeight: "bold",
                                color: "#16803c",
                                background: "#eaf8ef",
                                padding: "12px",
                                borderRadius: "8px",
                            }, children: mensagemPerfil })), _jsxs("form", { onSubmit: salvarPerfil, children: [_jsx("label", { children: "Nome completo" }), _jsx("input", { style: campo, value: perfil.nome, onChange: (e) => alterarPerfil("nome", e.target.value), required: true }), _jsx("label", { children: "Email" }), _jsx("input", { type: "email", style: {
                                        ...campo,
                                        background: "#f1f1f1",
                                    }, value: perfil.email, readOnly: true }), _jsx("label", { children: "Telefone" }), _jsx("input", { type: "tel", style: campo, placeholder: "Ex: 912 345 678", value: perfil.telefone, onChange: (e) => alterarPerfil("telefone", e.target.value) }), _jsx("label", { children: "WhatsApp" }), _jsx("input", { type: "tel", style: campo, placeholder: "Ex: 912 345 678", value: perfil.whatsapp, onChange: (e) => alterarPerfil("whatsapp", e.target.value) }), _jsx("label", { children: "Especialidade" }), _jsx("input", { style: campo, placeholder: "Ex: Eletricista", value: perfil.especialidade, onChange: (e) => alterarPerfil("especialidade", e.target.value), required: true }), _jsx("label", { children: "Zona de atendimento" }), _jsx("input", { style: campo, placeholder: "Ex: Lisboa e arredores", value: perfil.zona, onChange: (e) => alterarPerfil("zona", e.target.value), required: true }), _jsx("label", { children: "Sobre voc\u00EA" }), _jsx("textarea", { style: {
                                        ...campo,
                                        minHeight: "120px",
                                        resize: "vertical",
                                    }, placeholder: "Descreva sua experi\u00EAncia", value: perfil.descricao, onChange: (e) => alterarPerfil("descricao", e.target.value), required: true }), _jsx("button", { type: "submit", style: {
                                        background: "#061B41",
                                        color: "white",
                                        border: "none",
                                        padding: "13px 22px",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        fontWeight: "bold",
                                    }, children: "Salvar perfil" })] })] })), _jsxs("div", { style: {
                        background: "white",
                        padding: "25px",
                        borderRadius: "15px",
                        marginBottom: "30px",
                        boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
                    }, children: [_jsx("h2", { style: {
                                color: "#061B41",
                                marginTop: 0,
                            }, children: "\uD83D\uDD14 Novos pedidos" }), novosPedidos.length ===
                            0 && (_jsx("p", { children: "Nenhum pedido novo no momento." })), novosPedidos.map((pedido) => (_jsxs("div", { style: {
                                border: "1px solid #ddd",
                                padding: "20px",
                                borderRadius: "12px",
                                marginBottom: "15px",
                            }, children: [_jsx("h3", { style: {
                                        color: "#061B41",
                                    }, children: pedido.servico }), _jsxs("p", { children: [_jsx("strong", { children: "Descri\u00E7\u00E3o:" }), " ", pedido.descricao] }), _jsxs("p", { children: [_jsx("strong", { children: "Cliente:" }), " ", pedido.cliente] }), _jsxs("p", { children: [_jsx("strong", { children: "Local:" }), " ", pedido.local] }), _jsxs("p", { children: [_jsx("strong", { children: "Data:" }), " ", pedido.data] }), _jsxs("p", { children: [_jsx("strong", { children: "Valor:" }), " ", pedido.valor] }), _jsx("div", { style: {
                                        background: "#f5f5f5",
                                        padding: "12px",
                                        borderRadius: "8px",
                                        marginTop: "15px",
                                        marginBottom: "15px",
                                    }, children: "\uD83D\uDD12 Os contactos do cliente ficam protegidos at\u00E9 o servi\u00E7o ser aceite." }), _jsx("button", { type: "button", onClick: () => atualizarPedido(pedido.id, "Em andamento"), style: {
                                        background: "#061B41",
                                        color: "white",
                                        border: "none",
                                        padding: "12px 18px",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        fontWeight: "bold",
                                    }, children: "Aceitar servi\u00E7o" })] }, pedido.id)))] }), _jsxs("div", { style: {
                        background: "white",
                        padding: "25px",
                        borderRadius: "15px",
                        marginBottom: "30px",
                        boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
                    }, children: [_jsx("h2", { style: {
                                color: "#061B41",
                                marginTop: 0,
                            }, children: "\uD83D\uDD27 Meus servi\u00E7os" }), meusServicos.length ===
                            0 && (_jsx("p", { children: "Voc\u00EA ainda n\u00E3o possui servi\u00E7os em andamento." })), meusServicos.map((pedido) => {
                            const cliente = buscarCliente(pedido);
                            return (_jsxs("div", { style: {
                                    border: "1px solid #ddd",
                                    padding: "20px",
                                    borderRadius: "12px",
                                    marginBottom: "15px",
                                }, children: [_jsx("h3", { style: {
                                            color: "#061B41",
                                        }, children: pedido.servico }), _jsxs("p", { children: [_jsx("strong", { children: "Cliente:" }), " ", pedido.cliente] }), _jsxs("p", { children: [_jsx("strong", { children: "Status:" }), " ", pedido.status] }), _jsxs("p", { children: [_jsx("strong", { children: "Local:" }), " ", pedido.local] }), _jsxs("p", { children: [_jsx("strong", { children: "Data:" }), " ", pedido.data] }), _jsxs("div", { style: {
                                            background: "#eef8dc",
                                            padding: "18px",
                                            borderRadius: "10px",
                                            marginTop: "20px",
                                            marginBottom: "20px",
                                        }, children: [_jsx("h3", { style: {
                                                    color: "#061B41",
                                                    marginTop: 0,
                                                }, children: "\uD83D\uDCDE Contactos do cliente" }), _jsxs("p", { children: [_jsx("strong", { children: "Email:" }), " ", cliente?.email ||
                                                        "Não informado"] }), _jsxs("p", { children: [_jsx("strong", { children: "Telefone:" }), " ", cliente?.telefone ||
                                                        "Não informado"] }), _jsxs("p", { children: [_jsx("strong", { children: "WhatsApp:" }), " ", cliente?.whatsapp ||
                                                        "Não informado"] })] }), _jsx("button", { type: "button", onClick: () => atualizarPedido(pedido.id, "Concluído"), style: {
                                            background: "#B7F000",
                                            color: "#061B41",
                                            border: "none",
                                            padding: "12px 18px",
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                            fontWeight: "bold",
                                        }, children: "Concluir servi\u00E7o" })] }, pedido.id));
                        })] })] }) }));
}
export default PainelProfissional;
