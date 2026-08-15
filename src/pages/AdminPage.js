import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function AdminPage() {
    const navigate = useNavigate();
    const [logado, setLogado] = useState(false);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [usuarios, setUsuarios] = useState([]);
    const [pedidos, setPedidos] = useState([]);
    const [avaliacoes, setAvaliacoes] = useState([]);
    const [aba, setAba] = useState("resumo");
    const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
    const [clienteSelecionado, setClienteSelecionado] = useState(null);
    const [profissionalSelecionado, setProfissionalSelecionado] = useState(null);
    const [novoStatus, setNovoStatus] = useState("A definir");
    const [novoValor, setNovoValor] = useState("");
    const [novoProfissionalId, setNovoProfissionalId] = useState("");
    /* =========================
       CARREGAR DADOS
       ========================= */
    function carregarDados() {
        try {
            const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios") || "[]");
            const pedidosSalvos = JSON.parse(localStorage.getItem("pedidos") || "[]");
            const avaliacoesSalvas = JSON.parse(localStorage.getItem("avaliacoes") || "[]");
            setUsuarios(Array.isArray(usuariosSalvos)
                ? usuariosSalvos
                : []);
            setPedidos(Array.isArray(pedidosSalvos)
                ? pedidosSalvos
                : []);
            setAvaliacoes(Array.isArray(avaliacoesSalvas)
                ? avaliacoesSalvas
                : []);
        }
        catch (erro) {
            console.error("Erro ao carregar dados:", erro);
            setUsuarios([]);
            setPedidos([]);
            setAvaliacoes([]);
        }
    }
    /* =========================
       LOGIN
       ========================= */
    useEffect(() => {
        const admin = localStorage.getItem("admin_logado");
        if (admin === "true") {
            setLogado(true);
            carregarDados();
        }
    }, []);
    function entrar() {
        if (email === "admin@leprime.com" &&
            senha === "123456") {
            localStorage.setItem("admin_logado", "true");
            setLogado(true);
            carregarDados();
        }
        else {
            alert("Login administrador inválido");
        }
    }
    function sair() {
        localStorage.removeItem("admin_logado");
        setLogado(false);
        navigate("/");
    }
    /* =========================
       USUÁRIOS
       ========================= */
    const clientes = usuarios.filter((usuario) => usuario.tipo === "cliente");
    const profissionais = usuarios.filter((usuario) => usuario.tipo === "profissional");
    /* =========================
       ESTADOS
       ========================= */
    const pendentes = pedidos.filter((pedido) => pedido.status === "Pendente" ||
        pedido.status === "A definir").length;
    const andamento = pedidos.filter((pedido) => pedido.status === "Em andamento").length;
    const concluidos = pedidos.filter((pedido) => pedido.status === "Concluído").length;
    /* =========================
       ABRIR PEDIDO
       ========================= */
    function abrirPedido(pedido) {
        setPedidoSelecionado(pedido);
        setNovoStatus(pedido.status ||
            "A definir");
        setNovoValor(pedido.valor ||
            "");
        setNovoProfissionalId(pedido.profissionalId
            ? String(pedido.profissionalId)
            : "");
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
        const profissional = profissionais.find((usuario) => String(usuario.id) ===
            String(novoProfissionalId));
        const pedidosAtualizados = pedidos.map((pedido) => {
            if (String(pedido.id) !==
                String(pedidoSelecionado.id)) {
                return pedido;
            }
            return {
                ...pedido,
                status: novoStatus,
                valor: novoValor ||
                    "A definir",
                profissionalId: profissional
                    ? profissional.id
                    : null,
                profissional: profissional
                    ? profissional.nome
                    : "Aguardando profissional",
            };
        });
        localStorage.setItem("pedidos", JSON.stringify(pedidosAtualizados));
        setPedidos(pedidosAtualizados);
        const atualizado = pedidosAtualizados.find((pedido) => String(pedido.id) ===
            String(pedidoSelecionado.id));
        setPedidoSelecionado(atualizado);
        alert("Pedido atualizado com sucesso! ✅");
    }
    /* =========================
       REMOVER PEDIDO
       ========================= */
    function removerPedido() {
        if (!pedidoSelecionado) {
            return;
        }
        const confirmar = window.confirm("Tem certeza que deseja remover este pedido?");
        if (!confirmar) {
            return;
        }
        const atualizados = pedidos.filter((pedido) => String(pedido.id) !==
            String(pedidoSelecionado.id));
        localStorage.setItem("pedidos", JSON.stringify(atualizados));
        setPedidos(atualizados);
        fecharPedido();
    }
    /* =========================
       REMOVER USUÁRIO
       ========================= */
    function removerUsuario(usuario) {
        const confirmar = window.confirm(`Tem certeza que deseja remover ${usuario.nome}?`);
        if (!confirmar) {
            return;
        }
        const atualizados = usuarios.filter((item) => String(item.id) !==
            String(usuario.id));
        localStorage.setItem("usuarios", JSON.stringify(atualizados));
        setUsuarios(atualizados);
        setClienteSelecionado(null);
        setProfissionalSelecionado(null);
    }
    /* =========================
       ESTILO
       ========================= */
    const botaoAba = (ativa) => ({
        background: ativa
            ? "#B7F000"
            : "#061B41",
        color: ativa
            ? "#061B41"
            : "white",
        border: "none",
        padding: "12px 18px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
        marginRight: "8px",
        marginBottom: "8px",
    });
    const campo = {
        width: "100%",
        padding: "12px",
        marginTop: "6px",
        marginBottom: "15px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        boxSizing: "border-box",
    };
    const card = {
        background: "white",
        padding: "22px",
        borderRadius: "15px",
        marginBottom: "18px",
        boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
    };
    /* =========================
       LOGIN
       ========================= */
    if (!logado) {
        return (_jsx("div", { style: {
                minHeight: "100vh",
                background: "#f3f5f7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
            }, children: _jsxs("div", { style: {
                    background: "white",
                    padding: "35px",
                    borderRadius: "18px",
                    width: "100%",
                    maxWidth: "420px",
                    boxShadow: "0 5px 20px rgba(0,0,0,0.12)",
                }, children: [_jsx("h1", { style: {
                            color: "#061B41",
                            marginTop: 0,
                        }, children: "Login Administrador" }), _jsx("p", { children: "Controle da plataforma L&E Prime" }), _jsx("label", { children: "Email" }), _jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "Email", style: campo }), _jsx("label", { children: "Senha" }), _jsx("input", { type: "password", value: senha, onChange: (e) => setSenha(e.target.value), placeholder: "Senha", style: campo }), _jsx("button", { type: "button", onClick: entrar, style: {
                            background: "#061B41",
                            color: "white",
                            border: "none",
                            padding: "13px 20px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            width: "100%",
                        }, children: "Entrar" })] }) }));
    }
    /* =========================
       PAINEL
       ========================= */
    return (_jsx("div", { style: {
            minHeight: "100vh",
            background: "#f3f5f7",
            padding: "30px 20px",
            fontFamily: "Arial, sans-serif",
        }, children: _jsxs("div", { style: {
                maxWidth: "1200px",
                margin: "auto",
            }, children: [_jsxs("header", { style: {
                        background: "#061B41",
                        color: "white",
                        padding: "25px",
                        borderRadius: "16px",
                        marginBottom: "20px",
                    }, children: [_jsx("h1", { style: {
                                marginTop: 0,
                            }, children: "Painel Administrador" }), _jsx("p", { children: "Controle total da plataforma L&E Prime" }), _jsx("button", { type: "button", onClick: sair, style: {
                                background: "#B7F000",
                                color: "#061B41",
                                border: "none",
                                padding: "10px 18px",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontWeight: "bold",
                            }, children: "Sair" }), _jsx("button", { type: "button", onClick: carregarDados, style: {
                                background: "white",
                                color: "#061B41",
                                border: "none",
                                padding: "10px 18px",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontWeight: "bold",
                                marginLeft: "10px",
                            }, children: "\uD83D\uDD04 Atualizar" })] }), _jsxs("div", { style: {
                        marginBottom: "20px",
                    }, children: [_jsx("button", { type: "button", onClick: () => setAba("resumo"), style: botaoAba(aba === "resumo"), children: "\uD83D\uDCCA Resumo" }), _jsx("button", { type: "button", onClick: () => setAba("clientes"), style: botaoAba(aba === "clientes"), children: "\uD83D\uDC65 Clientes" }), _jsx("button", { type: "button", onClick: () => setAba("profissionais"), style: botaoAba(aba ===
                                "profissionais"), children: "\uD83D\uDD27 Profissionais" }), _jsx("button", { type: "button", onClick: () => setAba("pedidos"), style: botaoAba(aba === "pedidos"), children: "\uD83D\uDCE9 Pedidos" }), _jsx("button", { type: "button", onClick: () => setAba("avaliacoes"), style: botaoAba(aba ===
                                "avaliacoes"), children: "\u2B50 Avalia\u00E7\u00F5es" })] }), aba === "resumo" && (_jsxs(_Fragment, { children: [_jsxs("div", { style: {
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
                                gap: "15px",
                            }, children: [_jsxs("div", { style: card, children: [_jsx("h2", { children: "\uD83D\uDC65" }), _jsx("h3", { children: "Clientes" }), _jsx("strong", { style: {
                                                fontSize: "30px",
                                            }, children: clientes.length })] }), _jsxs("div", { style: card, children: [_jsx("h2", { children: "\uD83D\uDD27" }), _jsx("h3", { children: "Profissionais" }), _jsx("strong", { style: {
                                                fontSize: "30px",
                                            }, children: profissionais.length })] }), _jsxs("div", { style: card, children: [_jsx("h2", { children: "\uD83D\uDCE9" }), _jsx("h3", { children: "Pedidos" }), _jsx("strong", { style: {
                                                fontSize: "30px",
                                            }, children: pedidos.length })] }), _jsxs("div", { style: card, children: [_jsx("h2", { children: "\u2B50" }), _jsx("h3", { children: "Avalia\u00E7\u00F5es" }), _jsx("strong", { style: {
                                                fontSize: "30px",
                                            }, children: avaliacoes.length })] })] }), _jsxs("div", { style: card, children: [_jsx("h2", { children: "Estados dos pedidos" }), _jsxs("p", { children: ["\uD83D\uDFE1 Pendentes:", " ", _jsx("strong", { children: pendentes })] }), _jsxs("p", { children: ["\uD83D\uDD35 Em andamento:", " ", _jsx("strong", { children: andamento })] }), _jsxs("p", { children: ["\uD83D\uDFE2 Conclu\u00EDdos:", " ", _jsx("strong", { children: concluidos })] })] })] })), aba === "clientes" && (_jsxs("div", { style: card, children: [_jsx("h2", { children: "\uD83D\uDC65 Clientes" }), clientes.length ===
                            0 ? (_jsx("p", { children: "Nenhum cliente encontrado." })) : (clientes.map((cliente) => (_jsxs("div", { style: {
                                border: "1px solid #ddd",
                                borderRadius: "10px",
                                padding: "18px",
                                marginBottom: "12px",
                            }, children: [_jsx("h3", { children: cliente.nome }), _jsxs("p", { children: ["Email:", " ", cliente.email ||
                                            "Não informado"] }), _jsxs("p", { children: ["Telefone:", " ", cliente.telefone ||
                                            "Não informado"] }), _jsxs("p", { children: ["WhatsApp:", " ", cliente.whatsapp ||
                                            "Não informado"] }), _jsx("button", { type: "button", onClick: () => setClienteSelecionado(cliente), style: {
                                        background: "#061B41",
                                        color: "white",
                                        border: "none",
                                        padding: "10px 15px",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                    }, children: "Ver detalhes" })] }, cliente.id))))] })), aba ===
                    "profissionais" && (_jsxs("div", { style: card, children: [_jsx("h2", { children: "\uD83D\uDD27 Profissionais" }), profissionais.length ===
                            0 ? (_jsx("p", { children: "Nenhum profissional encontrado." })) : (profissionais.map((profissional) => (_jsxs("div", { style: {
                                border: "1px solid #ddd",
                                borderRadius: "10px",
                                padding: "18px",
                                marginBottom: "12px",
                            }, children: [_jsx("h3", { children: profissional.nome }), _jsxs("p", { children: ["Especialidade:", " ", profissional.especialidade ||
                                            "Não informado"] }), _jsxs("p", { children: ["Zona:", " ", profissional.zona ||
                                            "Não informado"] }), _jsxs("p", { children: ["Email:", " ", profissional.email ||
                                            "Não informado"] }), _jsxs("p", { children: ["Telefone:", " ", profissional.telefone ||
                                            "Não informado"] }), _jsxs("p", { children: ["WhatsApp:", " ", profissional.whatsapp ||
                                            "Não informado"] }), _jsx("button", { type: "button", onClick: () => setProfissionalSelecionado(profissional), style: {
                                        background: "#061B41",
                                        color: "white",
                                        border: "none",
                                        padding: "10px 15px",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                    }, children: "Ver detalhes" })] }, profissional.id))))] })), aba === "pedidos" && (_jsxs("div", { style: card, children: [_jsx("h2", { children: "\uD83D\uDCE9 Controle dos pedidos" }), pedidos.length ===
                            0 ? (_jsx("p", { children: "Nenhum pedido encontrado." })) : (pedidos
                            .slice()
                            .reverse()
                            .map((pedido) => (_jsxs("div", { style: {
                                border: "1px solid #ddd",
                                borderRadius: "12px",
                                padding: "20px",
                                marginBottom: "15px",
                            }, children: [_jsx("h3", { style: {
                                        color: "#061B41",
                                    }, children: pedido.servico ||
                                        "Serviço" }), _jsxs("p", { children: [_jsx("strong", { children: "Cliente:" }), " ", pedido.cliente ||
                                            "Não informado"] }), _jsxs("p", { children: [_jsx("strong", { children: "Profissional:" }), " ", pedido.profissional ||
                                            "Aguardando profissional"] }), _jsxs("p", { children: [_jsx("strong", { children: "Status:" }), " ", pedido.status ||
                                            "A definir"] }), _jsxs("p", { children: [_jsx("strong", { children: "Valor:" }), " ", pedido.valor ||
                                            "A definir"] }), _jsxs("p", { children: [_jsx("strong", { children: "Local:" }), " ", pedido.local ||
                                            "Não informado"] }), _jsxs("p", { children: [_jsx("strong", { children: "Data:" }), " ", pedido.data ||
                                            "Não informado"] }), _jsx("button", { type: "button", onClick: () => abrirPedido(pedido), style: {
                                        background: "#061B41",
                                        color: "white",
                                        border: "none",
                                        padding: "11px 18px",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        fontWeight: "bold",
                                    }, children: "\u2699\uFE0F Gerenciar pedido" })] }, pedido.id))))] })), aba ===
                    "avaliacoes" && (_jsxs("div", { style: card, children: [_jsx("h2", { children: "\u2B50 Avalia\u00E7\u00F5es" }), avaliacoes.length ===
                            0 ? (_jsx("p", { children: "Nenhuma avalia\u00E7\u00E3o encontrada." })) : (avaliacoes.map((avaliacao, index) => (_jsxs("div", { style: {
                                borderBottom: "1px solid #ddd",
                                padding: "15px 0",
                            }, children: [_jsxs("p", { children: ["Nota:", " ", _jsx("strong", { children: avaliacao.nota })] }), _jsxs("p", { children: ["Cliente:", " ", avaliacao.cliente ||
                                            "Não informado"] }), _jsxs("p", { children: ["Profissional:", " ", avaliacao.profissional ||
                                            "Não informado"] }), _jsx("p", { children: avaliacao.comentario ||
                                        "Sem comentário." })] }, avaliacao.id ||
                            index))))] })), pedidoSelecionado && (_jsx("div", { style: {
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0,0,0,0.55)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "20px",
                        zIndex: 9999,
                    }, children: _jsxs("div", { style: {
                            background: "white",
                            width: "100%",
                            maxWidth: "650px",
                            maxHeight: "90vh",
                            overflowY: "auto",
                            borderRadius: "16px",
                            padding: "25px",
                        }, children: [_jsx("h2", { style: {
                                    color: "#061B41",
                                    marginTop: 0,
                                }, children: "\u2699\uFE0F Gerenciar pedido" }), _jsxs("p", { children: [_jsx("strong", { children: "Servi\u00E7o:" }), " ", pedidoSelecionado.servico] }), _jsxs("p", { children: [_jsx("strong", { children: "Cliente:" }), " ", pedidoSelecionado.cliente ||
                                        "Não informado"] }), _jsxs("p", { children: [_jsx("strong", { children: "Descri\u00E7\u00E3o:" }), " ", pedidoSelecionado.descricao ||
                                        "Não informado"] }), _jsx("label", { children: _jsx("strong", { children: "Profissional" }) }), _jsxs("select", { value: novoProfissionalId, onChange: (e) => setNovoProfissionalId(e.target.value), style: campo, children: [_jsx("option", { value: "", children: "Aguardando profissional" }), profissionais.map((profissional) => (_jsxs("option", { value: profissional.id, children: [profissional.nome, " — ", profissional.especialidade ||
                                                "Profissional"] }, profissional.id)))] }), _jsx("label", { children: _jsx("strong", { children: "Valor do servi\u00E7o" }) }), _jsx("input", { type: "text", value: novoValor, onChange: (e) => setNovoValor(e.target.value), placeholder: "Ex: 60 \u20AC", style: campo }), _jsx("label", { children: _jsx("strong", { children: "Status do servi\u00E7o" }) }), _jsxs("select", { value: novoStatus, onChange: (e) => setNovoStatus(e.target.value), style: campo, children: [_jsx("option", { value: "A definir", children: "A definir" }), _jsx("option", { value: "Pendente", children: "Pendente" }), _jsx("option", { value: "Em andamento", children: "Em andamento" }), _jsx("option", { value: "Conclu\u00EDdo", children: "Conclu\u00EDdo" })] }), _jsx("div", { style: {
                                    background: novoStatus ===
                                        "Em andamento" ||
                                        novoStatus ===
                                            "Concluído"
                                        ? "#eef8dc"
                                        : "#f5f5f5",
                                    padding: "15px",
                                    borderRadius: "10px",
                                    marginBottom: "20px",
                                }, children: (novoStatus ===
                                    "Em andamento" ||
                                    novoStatus ===
                                        "Concluído") ? (_jsx("strong", { children: "\uD83D\uDD13 Contactos liberados" })) : (_jsx("strong", { children: "\uD83D\uDD12 Contactos protegidos" })) }), _jsx("button", { type: "button", onClick: salvarPedido, style: {
                                    background: "#061B41",
                                    color: "white",
                                    border: "none",
                                    padding: "12px 20px",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                }, children: "\uD83D\uDCBE Guardar altera\u00E7\u00F5es" }), _jsx("button", { type: "button", onClick: removerPedido, style: {
                                    background: "#c62828",
                                    color: "white",
                                    border: "none",
                                    padding: "12px 20px",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                    marginLeft: "10px",
                                }, children: "\uD83D\uDDD1\uFE0F Remover" }), _jsx("button", { type: "button", onClick: fecharPedido, style: {
                                    background: "#ddd",
                                    color: "#061B41",
                                    border: "none",
                                    padding: "12px 20px",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                    marginLeft: "10px",
                                }, children: "Fechar" })] }) })), clienteSelecionado && (_jsx("div", { style: {
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0,0,0,0.55)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "20px",
                        zIndex: 9999,
                    }, children: _jsxs("div", { style: {
                            background: "white",
                            width: "100%",
                            maxWidth: "550px",
                            borderRadius: "16px",
                            padding: "25px",
                        }, children: [_jsx("h2", { children: "\uD83D\uDC64 Cliente" }), _jsxs("p", { children: [_jsx("strong", { children: "Nome:" }), " ", clienteSelecionado.nome] }), _jsxs("p", { children: [_jsx("strong", { children: "Email:" }), " ", clienteSelecionado.email ||
                                        "Não informado"] }), _jsxs("p", { children: [_jsx("strong", { children: "Telefone:" }), " ", clienteSelecionado.telefone ||
                                        "Não informado"] }), _jsxs("p", { children: [_jsx("strong", { children: "WhatsApp:" }), " ", clienteSelecionado.whatsapp ||
                                        "Não informado"] }), _jsx("button", { type: "button", onClick: () => removerUsuario(clienteSelecionado), style: {
                                    background: "#c62828",
                                    color: "white",
                                    border: "none",
                                    padding: "11px 18px",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                }, children: "\uD83D\uDDD1\uFE0F Remover cliente" }), _jsx("button", { type: "button", onClick: () => setClienteSelecionado(null), style: {
                                    marginLeft: "10px",
                                    padding: "11px 18px",
                                    borderRadius: "8px",
                                    border: "none",
                                    cursor: "pointer",
                                }, children: "Fechar" })] }) })), profissionalSelecionado && (_jsx("div", { style: {
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0,0,0,0.55)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "20px",
                        zIndex: 9999,
                    }, children: _jsxs("div", { style: {
                            background: "white",
                            width: "100%",
                            maxWidth: "550px",
                            borderRadius: "16px",
                            padding: "25px",
                        }, children: [_jsx("h2", { children: "\uD83D\uDD27 Profissional" }), _jsxs("p", { children: [_jsx("strong", { children: "Nome:" }), " ", profissionalSelecionado.nome] }), _jsxs("p", { children: [_jsx("strong", { children: "Especialidade:" }), " ", profissionalSelecionado.especialidade ||
                                        "Não informado"] }), _jsxs("p", { children: [_jsx("strong", { children: "Zona:" }), " ", profissionalSelecionado.zona ||
                                        "Não informado"] }), _jsxs("p", { children: [_jsx("strong", { children: "Email:" }), " ", profissionalSelecionado.email ||
                                        "Não informado"] }), _jsxs("p", { children: [_jsx("strong", { children: "Telefone:" }), " ", profissionalSelecionado.telefone ||
                                        "Não informado"] }), _jsxs("p", { children: [_jsx("strong", { children: "WhatsApp:" }), " ", profissionalSelecionado.whatsapp ||
                                        "Não informado"] }), _jsx("button", { type: "button", onClick: () => removerUsuario(profissionalSelecionado), style: {
                                    background: "#c62828",
                                    color: "white",
                                    border: "none",
                                    padding: "11px 18px",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                }, children: "\uD83D\uDDD1\uFE0F Remover profissional" }), _jsx("button", { type: "button", onClick: () => setProfissionalSelecionado(null), style: {
                                    marginLeft: "10px",
                                    padding: "11px 18px",
                                    borderRadius: "8px",
                                    border: "none",
                                    cursor: "pointer",
                                }, children: "Fechar" })] }) }))] }) }));
}
