import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate, useParams } from "react-router-dom";
export default function PerfilProfissional() {
    const { id } = useParams();
    const navigate = useNavigate();
    const profissionais = JSON.parse(localStorage.getItem("leprime_profissionais") || "[]");
    const profissional = profissionais.find((p) => String(p.id) === String(id));
    const avaliacoes = JSON.parse(localStorage.getItem("leprime_avaliacoes") || "[]");
    const avaliacoesProfissional = profissional
        ? avaliacoes.filter((a) => String(a.profissionalId) ===
            String(profissional.id))
        : [];
    const totalNotas = avaliacoesProfissional.reduce((total, avaliacao) => {
        const nota = Number(avaliacao.nota);
        if (nota >= 1 && nota <= 5) {
            return total + nota;
        }
        return total;
    }, 0);
    const media = avaliacoesProfissional.length > 0
        ? (totalNotas /
            avaliacoesProfissional.length).toFixed(1)
        : "0.0";
    function solicitarOrcamento() {
        if (!profissional) {
            alert("Profissional não encontrado.");
            return;
        }
        const cliente = localStorage.getItem("cliente_logado");
        if (!cliente) {
            navigate("/login");
            return;
        }
        localStorage.setItem("profissional_selecionado", JSON.stringify(profissional));
        localStorage.setItem("servico_selecionado", profissional.profissao ||
            profissional.servico ||
            "Serviço");
        navigate("/pedido");
    }
    if (!profissional) {
        return (_jsxs("div", { style: {
                padding: "30px",
                background: "#F5F7F2",
                minHeight: "100vh",
            }, children: [_jsx("h2", { children: "Profissional n\u00E3o encontrado" }), _jsx("button", { onClick: () => navigate("/profissionais"), style: {
                        background: "#061B41",
                        color: "#fff",
                        border: "none",
                        padding: "12px 20px",
                        borderRadius: "8px",
                        cursor: "pointer",
                    }, children: "\u2190 Voltar" })] }));
    }
    return (_jsx("div", { style: {
            minHeight: "100vh",
            background: "#F5F7F2",
            padding: "30px 20px",
        }, children: _jsxs("div", { style: {
                maxWidth: "700px",
                margin: "0 auto",
            }, children: [_jsx("button", { onClick: () => navigate("/profissionais"), style: {
                        marginBottom: "20px",
                        background: "#061B41",
                        color: "#fff",
                        border: "none",
                        padding: "10px 18px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold",
                    }, children: "\u2190 Voltar" }), _jsxs("div", { style: {
                        background: "#fff",
                        borderRadius: "15px",
                        padding: "30px",
                        boxShadow: "0 3px 15px rgba(0,0,0,0.08)",
                    }, children: [_jsxs("div", { style: {
                                textAlign: "center",
                            }, children: [profissional.foto ? (_jsx("img", { src: profissional.foto, alt: profissional.nome, style: {
                                        width: "130px",
                                        height: "130px",
                                        objectFit: "cover",
                                        borderRadius: "50%",
                                        border: "4px solid #B8F000",
                                        marginBottom: "15px",
                                    } })) : (_jsx("div", { style: {
                                        width: "130px",
                                        height: "130px",
                                        borderRadius: "50%",
                                        background: "#061B41",
                                        color: "#B8F000",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "50px",
                                        fontWeight: "bold",
                                        margin: "0 auto 15px",
                                    }, children: "\uD83D\uDC77" })), _jsx("h1", { style: {
                                        color: "#061B41",
                                        marginBottom: "8px",
                                    }, children: profissional.nome }), _jsxs("h2", { style: {
                                        marginTop: "5px",
                                    }, children: ["\uD83D\uDD27 ", profissional.profissao] }), _jsxs("p", { children: ["\uD83D\uDCCD ", profissional.cidade] })] }), _jsxs("div", { style: {
                                marginTop: "25px",
                                padding: "20px",
                                background: "#F5F7F2",
                                borderRadius: "12px",
                                textAlign: "center",
                            }, children: [_jsxs("h2", { style: {
                                        margin: "0 0 8px",
                                        color: "#061B41",
                                    }, children: ["\u2B50 ", media, " / 5"] }), _jsx("div", { style: {
                                        fontSize: "25px",
                                        marginBottom: "8px",
                                    }, children: "⭐".repeat(Math.max(0, Math.min(5, Math.round(Number(media))))) }), _jsxs("p", { style: {
                                        margin: 0,
                                    }, children: [_jsx("strong", { children: avaliacoesProfissional.length }), " ", avaliacoesProfissional.length ===
                                            1
                                            ? "avaliação"
                                            : "avaliações"] })] }), _jsx("button", { onClick: solicitarOrcamento, style: {
                                marginTop: "25px",
                                width: "100%",
                                background: "#B8F000",
                                color: "#061B41",
                                border: "none",
                                padding: "14px 20px",
                                borderRadius: "8px",
                                fontWeight: "bold",
                                fontSize: "16px",
                                cursor: "pointer",
                            }, children: "Solicitar or\u00E7amento" }), _jsx("hr", { style: {
                                margin: "30px 0",
                                border: "none",
                                borderTop: "1px solid #ddd",
                            } }), _jsx("h2", { style: {
                                color: "#061B41",
                            }, children: "Avalia\u00E7\u00F5es dos clientes" }), avaliacoesProfissional.length ===
                            0 ? (_jsxs("div", { style: {
                                background: "#F5F7F2",
                                padding: "20px",
                                borderRadius: "10px",
                                marginTop: "15px",
                            }, children: [_jsx("p", { children: "Este profissional ainda n\u00E3o recebeu avalia\u00E7\u00F5es." }), _jsx("p", { style: {
                                        marginBottom: 0,
                                    }, children: "Seja o primeiro cliente a avaliar este servi\u00E7o." })] })) : (avaliacoesProfissional
                            .slice()
                            .reverse()
                            .map((a) => {
                            const nota = Math.max(1, Math.min(5, Number(a.nota) || 1));
                            return (_jsxs("div", { style: {
                                    borderBottom: "1px solid #ddd",
                                    padding: "18px 0",
                                }, children: [_jsx("div", { style: {
                                            fontSize: "20px",
                                            marginBottom: "8px",
                                        }, children: "⭐".repeat(nota) }), _jsx("strong", { style: {
                                            color: "#061B41",
                                        }, children: a.cliente ||
                                            "Cliente" }), _jsx("p", { style: {
                                            marginBottom: 0,
                                        }, children: a.comentario &&
                                            a.comentario.trim()
                                            ? a.comentario
                                            : "Sem comentário." })] }, a.id));
                        }))] })] }) }));
}
