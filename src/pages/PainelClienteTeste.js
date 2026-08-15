import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { buscarPedidos } from "../data/pedidosStore";
function PainelCliente() {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado") || "{}");
    const [pedidos, setPedidos] = useState(buscarPedidos());
    const [mostrarPerfil, setMostrarPerfil] = useState(false);
    const [mensagemPerfil, setMensagemPerfil] = useState("");
    const [perfil, setPerfil] = useState({
        nome: usuario.nome || "",
        email: usuario.email || "",
        telefone: usuario.telefone || "",
        whatsapp: usuario.whatsapp || "",
    });
    const [profissionalSelecionado, setProfissionalSelecionado] = useState(null);
    const [contactosLiberados, setContactosLiberados] = useState(false);
    function atualizarPedidos() {
        setPedidos(buscarPedidos());
    }
    function abrirNovoPedido() {
        window.location.href = "/novo-pedido";
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
            const usuariosAtualizados = usuarios.map((u) => {
                if (String(u.id) ===
                    String(usuario.id)) {
                    return {
                        ...u,
                        nome: perfil.nome,
                        email: u.email ||
                            perfil.email,
                        telefone: perfil.telefone,
                        whatsapp: perfil.whatsapp,
                    };
                }
                return u;
            });
            localStorage.setItem("usuarios", JSON.stringify(usuariosAtualizados));
            const usuarioAtualizado = {
                ...usuario,
                nome: perfil.nome,
                email: usuario.email ||
                    perfil.email,
                telefone: perfil.telefone,
                whatsapp: perfil.whatsapp,
            };
            localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAtualizado));
            setMensagemPerfil("Perfil atualizado com sucesso! ✅");
        }
        catch (erro) {
            console.error("Erro ao salvar perfil:", erro);
            setMensagemPerfil("Não foi possível salvar o perfil.");
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
        return (texto.substring(0, quantidade) + "...");
    }
    function abrirPerfil(profissionalId, nome, liberarContactos) {
        const usuariosSalvos = localStorage.getItem("usuarios");
        let usuarios = [];
        try {
            usuarios = usuariosSalvos
                ? JSON.parse(usuariosSalvos)
                : [];
        }
        catch {
            usuarios = [];
        }
        const profissional = usuarios.find((u) => u.tipo ===
            "profissional" &&
            (String(u.id) ===
                String(profissionalId) ||
                u.nome === nome));
        setContactosLiberados(liberarContactos);
        if (profissional) {
            setProfissionalSelecionado({
                nome: profissional.nome ||
                    nome ||
                    "Profissional",
                especialidade: profissional.especialidade ||
                    "Não informado",
                zona: profissional.zona ||
                    "Não informado",
                descricao: profissional.descricao ||
                    "Nenhuma descrição cadastrada.",
                email: profissional.email ||
                    "",
                telefone: profissional.telefone ||
                    "",
                whatsapp: profissional.whatsapp ||
                    "",
            });
        }
        else {
            setProfissionalSelecionado({
                nome: nome ||
                    "Profissional",
                especialidade: "Não informado",
                zona: "Não informado",
                descricao: "Este profissional ainda não possui um perfil completo cadastrado.",
                email: "",
                telefone: "",
                whatsapp: "",
            });
        }
    }
    function fecharPerfil() {
        setProfissionalSelecionado(null);
        setContactosLiberados(false);
    }
    function pedidoLiberaContactos(pedido) {
        return (pedido.status ===
            "Em andamento" ||
            pedido.status ===
                "Concluído");
    }
    const meusPedidos = pedidos.filter((pedido) => !pedido.clienteId ||
        String(pedido.clienteId) ===
            String(usuario.id));
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
                            }, children: "LE Prime Servi\u00E7os" }), _jsxs("p", { children: ["Bem-vindo,", " ", usuario.nome ||
                                    "Cliente"] })] }), _jsx("button", { type: "button", onClick: () => {
                        setMostrarPerfil(!mostrarPerfil);
                        setMensagemPerfil("");
                    }, style: {
                        background: "#B7F000",
                        color: "#061B41",
                        border: "none",
                        padding: "13px 20px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        marginBottom: "15px",
                        marginRight: "10px",
                    }, children: mostrarPerfil
                        ? "Fechar meu perfil"
                        : "Meu perfil" }), _jsx("button", { type: "button", onClick: atualizarPedidos, style: {
                        background: "#061B41",
                        color: "white",
                        border: "none",
                        padding: "13px 20px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        marginBottom: "25px",
                    }, children: "Atualizar pedidos" }), _jsx("button", { type: "button", onClick: abrirNovoPedido, style: {
                        background: "#061B41",
                        color: "white",
                        border: "none",
                        padding: "13px 20px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        marginBottom: "25px",
                        marginLeft: "10px",
                    }, children: "+ Novo pedido" }), mostrarPerfil && (_jsxs("div", { style: {
                        background: "white",
                        padding: "25px",
                        borderRadius: "15px",
                        marginBottom: "30px",
                        boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
                    }, children: [_jsx("h2", { style: {
                                color: "#061B41",
                                marginTop: 0,
                            }, children: "Meu perfil de cliente" }), mensagemPerfil && (_jsx("p", { style: {
                                fontWeight: "bold",
                                color: "#16803c",
                                background: "#eaf8ef",
                                padding: "12px",
                                borderRadius: "8px",
                            }, children: mensagemPerfil })), _jsxs("form", { onSubmit: salvarPerfil, children: [_jsx("label", { children: "Nome completo" }), _jsx("input", { style: campo, value: perfil.nome, onChange: (e) => alterarPerfil("nome", e.target.value), required: true }), _jsx("label", { children: "Email" }), _jsx("input", { type: "email", style: {
                                        ...campo,
                                        background: "#f1f1f1",
                                    }, value: perfil.email, readOnly: true }), _jsx("small", { style: {
                                        display: "block",
                                        marginTop: "-10px",
                                        marginBottom: "16px",
                                        color: "#666",
                                    }, children: "O email usado no login n\u00E3o pode ser alterado aqui." }), _jsx("label", { children: "Telefone" }), _jsx("input", { type: "tel", style: campo, placeholder: "Ex: 912 345 678", value: perfil.telefone, onChange: (e) => alterarPerfil("telefone", e.target.value) }), _jsx("label", { children: "WhatsApp" }), _jsx("input", { type: "tel", style: campo, placeholder: "Ex: 912 345 678", value: perfil.whatsapp, onChange: (e) => alterarPerfil("whatsapp", e.target.value) }), _jsx("button", { type: "submit", style: {
                                        background: "#061B41",
                                        color: "white",
                                        border: "none",
                                        padding: "13px 22px",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        fontWeight: "bold",
                                    }, children: "Salvar perfil" })] })] })), _jsx("h2", { style: {
                        color: "#061B41",
                    }, children: "Meus pedidos" }), meusPedidos.length ===
                    0 && (_jsx("p", { children: "Nenhum pedido encontrado." })), meusPedidos.map((pedido) => {
                    const liberar = pedidoLiberaContactos(pedido);
                    return (_jsxs("div", { style: {
                            background: "white",
                            padding: "25px",
                            borderRadius: "15px",
                            marginBottom: "20px",
                            boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
                        }, children: [_jsx("h2", { style: {
                                    color: "#061B41",
                                }, children: pedido.servico }), _jsxs("p", { children: [_jsx("strong", { children: "Descri\u00E7\u00E3o:" }), " ", pedido.descricao] }), _jsxs("p", { children: [_jsx("strong", { children: "Profissional:" }), " ", pedido.profissional ||
                                        "Aguardando profissional"] }), pedido.profissional &&
                                pedido.profissional !==
                                    "Aguardando profissional" && (_jsx("button", { type: "button", onClick: () => abrirPerfil(pedido.profissionalId, pedido.profissional, liberar), style: {
                                    background: "#061B41",
                                    color: "white",
                                    border: "none",
                                    padding: "10px 15px",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                    marginBottom: "15px",
                                }, children: "Ver perfil profissional" })), _jsxs("p", { children: [_jsx("strong", { children: "Status:" }), " ", pedido.status] }), _jsxs("p", { children: [_jsx("strong", { children: "Local:" }), " ", pedido.local] }), _jsxs("p", { children: [_jsx("strong", { children: "Data:" }), " ", pedido.data] }), _jsxs("p", { children: [_jsx("strong", { children: "Valor:" }), " ", pedido.valor] }), pedido.profissional &&
                                !liberar && (_jsx("div", { style: {
                                    background: "#f5f5f5",
                                    padding: "15px",
                                    borderRadius: "10px",
                                    marginTop: "15px",
                                }, children: "\uD83D\uDD12 Os contactos completos do profissional ser\u00E3o disponibilizados quando o servi\u00E7o for aceite." }))] }, pedido.id));
                }), profissionalSelecionado && (_jsxs("div", { style: {
                        background: "white",
                        padding: "30px",
                        borderRadius: "18px",
                        marginTop: "30px",
                        marginBottom: "40px",
                        boxShadow: "0 3px 15px rgba(0,0,0,0.12)",
                        border: "2px solid #061B41",
                    }, children: [_jsx("h2", { style: {
                                color: "#061B41",
                                marginTop: 0,
                            }, children: "Perfil profissional" }), _jsx("h1", { style: {
                                color: "#061B41",
                            }, children: profissionalSelecionado.nome }), _jsxs("p", { children: [_jsx("strong", { children: "Especialidade:" }), " ", profissionalSelecionado.especialidade ||
                                    "Não informado"] }), _jsxs("p", { children: [_jsx("strong", { children: "Zona de atendimento:" }), " ", profissionalSelecionado.zona ||
                                    "Não informado"] }), _jsx("p", { children: _jsx("strong", { children: "Sobre o profissional:" }) }), _jsx("p", { children: profissionalSelecionado.descricao ||
                                "Nenhuma descrição cadastrada." }), _jsxs("p", { children: [_jsx("strong", { children: "Avalia\u00E7\u00E3o:" }), " ", "\u2B50 5.0"] }), _jsxs("p", { children: [_jsx("strong", { children: "Servi\u00E7os realizados:" }), " ", "0"] }), contactosLiberados ? (_jsxs("div", { style: {
                                background: "#eef8dc",
                                padding: "18px",
                                borderRadius: "10px",
                                marginTop: "20px",
                                marginBottom: "20px",
                            }, children: [_jsx("h3", { style: {
                                        color: "#061B41",
                                        marginTop: 0,
                                    }, children: "\uD83D\uDCDE Contactos do profissional" }), _jsxs("p", { children: [_jsx("strong", { children: "Email:" }), " ", profissionalSelecionado.email ||
                                            "Não informado"] }), _jsxs("p", { children: [_jsx("strong", { children: "Telefone:" }), " ", profissionalSelecionado.telefone ||
                                            "Não informado"] }), _jsxs("p", { children: [_jsx("strong", { children: "WhatsApp:" }), " ", profissionalSelecionado.whatsapp ||
                                            "Não informado"] })] })) : (_jsxs("div", { style: {
                                background: "#f5f5f5",
                                padding: "18px",
                                borderRadius: "10px",
                                marginTop: "20px",
                                marginBottom: "20px",
                            }, children: [_jsx("h3", { style: {
                                        color: "#061B41",
                                        marginTop: 0,
                                    }, children: "\uD83D\uDCDE Contactos do profissional" }), _jsxs("p", { children: [_jsx("strong", { children: "Email:" }), " ", mascararEmail(profissionalSelecionado.email)] }), _jsxs("p", { children: [_jsx("strong", { children: "Telefone:" }), " ", mascararTelefone(profissionalSelecionado.telefone)] }), _jsxs("p", { children: [_jsx("strong", { children: "WhatsApp:" }), " ", mascararTelefone(profissionalSelecionado.whatsapp)] }), _jsx("p", { style: {
                                        color: "#666",
                                        fontSize: "14px",
                                        marginBottom: 0,
                                    }, children: "\uD83D\uDD12 O servi\u00E7o ainda n\u00E3o foi aceite. Os contactos completos est\u00E3o protegidos." })] })), _jsx("button", { type: "button", onClick: fecharPerfil, style: {
                                background: "#061B41",
                                color: "white",
                                border: "none",
                                padding: "12px 20px",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontWeight: "bold",
                                marginTop: "10px",
                            }, children: "Fechar perfil" })] }))] }) }));
}
export default PainelCliente;
