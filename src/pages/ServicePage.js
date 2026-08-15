import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
export default function ServicePage() {
    const navigate = useNavigate();
    const servicos = [
        {
            nome: "Eletricista",
            icone: "🔧",
            descricao: "Instalações e reparações elétricas residenciais e comerciais.",
        },
        {
            nome: "Canalizador",
            icone: "🚰",
            descricao: "Reparações hidráulicas, fugas e manutenção.",
        },
        {
            nome: "Pintor",
            icone: "🎨",
            descricao: "Pintura residencial e comercial.",
        },
        {
            nome: "Limpeza",
            icone: "🧹",
            descricao: "Serviços de limpeza para casas e empresas.",
        },
        {
            nome: "Jardinagem",
            icone: "🌳",
            descricao: "Manutenção e cuidados com jardins.",
        },
    ];
    function solicitarOrcamento(servico) {
        localStorage.setItem("servico_selecionado", servico);
        const cliente = localStorage.getItem("cliente_logado");
        if (!cliente) {
            navigate("/login");
            return;
        }
        navigate("/pedido");
    }
    return (_jsxs("div", { style: {
            minHeight: "100vh",
            background: "#F5F7F2",
            padding: "30px 20px",
        }, children: [_jsx("h1", { style: {
                    textAlign: "center",
                    color: "#061B41",
                }, children: "Servi\u00E7os L&E Prime" }), _jsx("p", { style: { textAlign: "center" }, children: "Escolha o servi\u00E7o que precisa." }), _jsx("div", { style: {
                    maxWidth: "1100px",
                    margin: "30px auto",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "20px",
                }, children: servicos.map((servico) => (_jsxs("div", { style: {
                        background: "#fff",
                        padding: "25px",
                        borderRadius: "15px",
                        boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
                    }, children: [_jsx("div", { style: { fontSize: "35px" }, children: servico.icone }), _jsx("h2", { style: { color: "#061B41" }, children: servico.nome }), _jsx("p", { children: servico.descricao }), _jsx("button", { onClick: () => solicitarOrcamento(servico.nome), style: {
                                background: "#B8F000",
                                color: "#061B41",
                                border: "none",
                                padding: "12px 18px",
                                borderRadius: "8px",
                                fontWeight: "bold",
                                cursor: "pointer",
                            }, children: "Solicitar or\u00E7amento" })] }, servico.nome))) })] }));
}
