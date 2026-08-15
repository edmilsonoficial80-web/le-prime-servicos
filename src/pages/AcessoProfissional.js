import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
export default function AcessoProfissionalPage() {
    const navigate = useNavigate();
    const profissionais = JSON.parse(localStorage.getItem("leprime_profissionais") || "[]");
    const avaliacoes = JSON.parse(localStorage.getItem("leprime_avaliacoes") || "[]");
    function entrarPainel(id) {
        navigate(`/painel-profissional/${id}`);
    }
    function calcularNota(id) {
        const lista = avaliacoes.filter((a) => String(a.profissionalId) === String(id));
        if (lista.length === 0) {
            return null;
        }
        const total = lista.reduce((soma, a) => soma + Number(a.nota), 0);
        return (total / lista.length).toFixed(1);
    }
    return (_jsxs("div", { style: {
            minHeight: "100vh",
            background: "#F5F7F2",
            padding: "40px 20px"
        }, children: [_jsx("h1", { style: {
                    textAlign: "center"
                }, children: "Acesso Profissional" }), _jsx("p", { style: {
                    textAlign: "center"
                }, children: "Escolha o seu perfil para entrar." }), _jsx("div", { style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
                    gap: 25
                }, children: profissionais.map((profissional) => (_jsxs("div", { className: "card", style: {
                        textAlign: "center"
                    }, children: [_jsx("div", { style: {
                                fontSize: 45
                            }, children: "\uD83D\uDC64" }), _jsx("h2", { children: profissional.nome }), _jsxs("h3", { style: {
                                color: "#082654"
                            }, children: ["\uD83D\uDD27 ", profissional.profissao] }), _jsxs("p", { children: ["\uD83D\uDCCD ", profissional.cidade] }), calcularNota(profissional.id) && (_jsxs("p", { children: ["\u2B50 ", calcularNota(profissional.id)] })), calcularNota(profissional.id) && (_jsx("p", { children: "\uD83C\uDFC6 Profissional recomendado" })), _jsx("button", { onClick: () => entrarPainel(profissional.id), children: "Entrar no painel" })] }, profissional.id))) })] }));
}
