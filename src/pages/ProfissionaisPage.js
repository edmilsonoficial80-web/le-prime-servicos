import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
export default function ProfissionaisPage() {
    const { tipo } = useParams();
    const navigate = useNavigate();
    const [pesquisa, setPesquisa] = useState("");
    const [cidade, setCidade] = useState("");
    const dados = localStorage.getItem("leprime_profissionais");
    const profissionais = dados
        ? JSON.parse(dados)
        : [];
    const cidades = Array.from(new Set(profissionais
        .map((p) => p.cidade)
        .filter((c) => c))).sort();
    function obterAvaliacoes(profissionalId) {
        const avaliacoes = JSON.parse(localStorage.getItem("leprime_avaliacoes") || "[]");
        return avaliacoes.filter((a) => String(a.profissionalId) ===
            String(profissionalId));
    }
    function mediaProfissional(profissionalId) {
        const listaAvaliacoes = obterAvaliacoes(profissionalId);
        if (listaAvaliacoes.length === 0) {
            return null;
        }
        const total = listaAvaliacoes.reduce((soma, avaliacao) => soma +
            Number(avaliacao.nota || 0), 0);
        return (total /
            listaAvaliacoes.length).toFixed(1);
    }
    const lista = profissionais.filter((p) => {
        const nome = String(p.nome || "").toLowerCase();
        const profissao = String(p.profissao ||
            p.servico ||
            "").toLowerCase();
        const cidadeProfissional = String(p.cidade || "").toLowerCase();
        const termo = pesquisa
            .trim()
            .toLowerCase();
        const correspondePesquisa = !termo ||
            nome.includes(termo) ||
            profissao.includes(termo);
        const correspondeTipo = !tipo ||
            profissao.includes(tipo.toLowerCase());
        const correspondeCidade = !cidade ||
            cidadeProfissional ===
                cidade.toLowerCase();
        return (correspondePesquisa &&
            correspondeTipo &&
            correspondeCidade);
    });
    return (_jsx("div", { style: {
            padding: "40px 20px",
            background: "#F5F7F2",
            minHeight: "100vh",
        }, children: _jsxs("div", { style: {
                maxWidth: "1100px",
                margin: "0 auto",
            }, children: [_jsx("h1", { style: {
                        color: "#061B41",
                    }, children: "Profissionais L&E Prime" }), _jsx("p", { children: "Encontre profissionais para sua obra ou manuten\u00E7\u00E3o." }), _jsxs("div", { style: {
                        background: "#fff",
                        padding: "20px",
                        borderRadius: "15px",
                        marginTop: "25px",
                        boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
                    }, children: [_jsx("h3", { style: {
                                color: "#061B41",
                                marginTop: 0,
                            }, children: "\uD83D\uDD0E Procurar profissional" }), _jsx("input", { type: "text", placeholder: "Nome ou profiss\u00E3o...", value: pesquisa, onChange: (e) => setPesquisa(e.target.value), style: {
                                width: "100%",
                                boxSizing: "border-box",
                                padding: "13px",
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                fontSize: "15px",
                            } }), _jsxs("div", { style: {
                                marginTop: "15px",
                            }, children: [_jsx("label", { children: _jsx("strong", { children: "\uD83D\uDCCD Cidade" }) }), _jsxs("select", { value: cidade, onChange: (e) => setCidade(e.target.value), style: {
                                        width: "100%",
                                        boxSizing: "border-box",
                                        padding: "13px",
                                        marginTop: "8px",
                                        border: "1px solid #ccc",
                                        borderRadius: "8px",
                                        background: "#fff",
                                        fontSize: "15px",
                                    }, children: [_jsx("option", { value: "", children: "Todas as cidades" }), cidades.map((nomeCidade) => (_jsx("option", { value: nomeCidade, children: nomeCidade }, nomeCidade)))] })] }), (pesquisa ||
                            cidade) && (_jsx("button", { onClick: () => {
                                setPesquisa("");
                                setCidade("");
                            }, style: {
                                marginTop: "15px",
                                background: "#061B41",
                                color: "#fff",
                                border: "none",
                                padding: "10px 18px",
                                borderRadius: "8px",
                                cursor: "pointer",
                            }, children: "Limpar filtros" }))] }), _jsxs("p", { style: {
                        marginTop: "25px",
                        fontWeight: "bold",
                        color: "#061B41",
                    }, children: [lista.length, " ", lista.length === 1
                            ? "profissional encontrado"
                            : "profissionais encontrados"] }), lista.length === 0 ? (_jsxs("div", { style: {
                        marginTop: 20,
                        background: "#fff",
                        padding: "30px",
                        borderRadius: "15px",
                    }, children: [_jsx("h2", { children: "Nenhum profissional encontrado" }), _jsx("p", { children: "Tente outra profiss\u00E3o ou outra cidade." })] })) : (_jsx("div", { style: {
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
                        gap: 20,
                        marginTop: 20,
                    }, children: lista.map((profissional) => {
                        const avaliacoes = obterAvaliacoes(profissional.id);
                        const media = mediaProfissional(profissional.id);
                        return (_jsxs("div", { style: {
                                background: "#fff",
                                padding: "25px",
                                borderRadius: "15px",
                                boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
                            }, children: [_jsx("div", { style: {
                                        display: "flex",
                                        justifyContent: "center",
                                        marginBottom: "18px",
                                    }, children: profissional.foto ? (_jsx("img", { src: profissional.foto, alt: `Foto de ${profissional.nome}`, style: {
                                            width: "110px",
                                            height: "110px",
                                            objectFit: "cover",
                                            borderRadius: "50%",
                                            border: "4px solid #B8F000",
                                        } })) : (_jsx("div", { style: {
                                            width: "110px",
                                            height: "110px",
                                            borderRadius: "50%",
                                            background: "#061B41",
                                            color: "#B8F000",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "42px",
                                            fontWeight: "bold",
                                            border: "4px solid #B8F000",
                                        }, children: profissional.nome
                                            ? profissional.nome
                                                .charAt(0)
                                                .toUpperCase()
                                            : "P" })) }), _jsx("h2", { style: {
                                        color: "#061B41",
                                        textAlign: "center",
                                        marginBottom: "10px",
                                    }, children: profissional.nome }), _jsxs("p", { style: {
                                        textAlign: "center",
                                    }, children: ["\uD83D\uDD27", " ", profissional.profissao ||
                                            profissional.servico ||
                                            "Profissional"] }), _jsxs("p", { style: {
                                        textAlign: "center",
                                    }, children: ["\uD83D\uDCCD", " ", profissional.cidade ||
                                            "Localização não informada"] }), _jsx("div", { style: {
                                        textAlign: "center",
                                        marginTop: "15px",
                                        minHeight: "50px",
                                    }, children: media ? (_jsxs(_Fragment, { children: [_jsxs("div", { style: {
                                                    fontSize: "18px",
                                                    fontWeight: "bold",
                                                    color: "#061B41",
                                                }, children: ["\u2B50 ", media, " / 5"] }), _jsxs("div", { style: {
                                                    marginTop: "5px",
                                                    color: "#555",
                                                    fontSize: "14px",
                                                }, children: [avaliacoes.length, " ", avaliacoes.length ===
                                                        1
                                                        ? "avaliação"
                                                        : "avaliações"] })] })) : (_jsx("span", { style: {
                                            color: "#777",
                                            fontSize: "14px",
                                        }, children: "Ainda sem avalia\u00E7\u00F5es" })) }), _jsx("button", { onClick: () => navigate(`/profissional/${profissional.id}`), style: {
                                        width: "100%",
                                        marginTop: "15px",
                                        background: "#B8F000",
                                        color: "#061B41",
                                        border: "none",
                                        padding: "13px 20px",
                                        borderRadius: "8px",
                                        fontWeight: "bold",
                                        cursor: "pointer",
                                    }, children: "Ver perfil" })] }, profissional.id));
                    }) }))] }) }));
}
