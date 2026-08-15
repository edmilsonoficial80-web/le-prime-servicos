import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
    const navigate = useNavigate();
    return (_jsxs("div", { style: {
            background: "#F5F7F2",
            minHeight: "100vh"
        }, children: [_jsxs("section", { style: {
                    background: "#061B41",
                    color: "#fff",
                    height: "300px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center"
                }, children: [_jsx("h2", { style: {
                            margin: 0,
                            fontSize: "24px"
                        }, children: "L&E Prime" }), _jsxs("h3", { style: {
                            color: "#B8F000",
                            margin: "10px 0"
                        }, children: ["Gerimos servi\u00E7os.", _jsx("br", {}), "Entregamos solu\u00E7\u00F5es."] }), _jsx("p", { style: {
                            fontSize: "13px"
                        }, children: "Encontre profissionais de confian\u00E7a para sua casa ou empresa." }), _jsxs("div", { style: {
                            display: "flex",
                            gap: "12px",
                            marginTop: "15px"
                        }, children: [_jsx("button", { onClick: () => navigate("/servicos"), style: {
                                    background: "#B8F000",
                                    border: "none",
                                    padding: "10px 20px",
                                    borderRadius: "8px",
                                    fontWeight: "bold",
                                    cursor: "pointer"
                                }, children: "Ver servi\u00E7os" }), _jsx("button", { onClick: () => navigate("/registro/profissional"), style: {
                                    background: "transparent",
                                    color: "#B8F000",
                                    border: "1px solid #B8F000",
                                    padding: "10px 20px",
                                    borderRadius: "8px",
                                    fontWeight: "bold",
                                    cursor: "pointer"
                                }, children: "Sou profissional" })] })] }), _jsxs("section", { style: {
                    padding: "30px 20px"
                }, children: [_jsx("h2", { style: {
                            textAlign: "center",
                            color: "#061B41"
                        }, children: "Servi\u00E7os dispon\u00EDveis" }), _jsxs("div", { style: {
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
                            gap: "20px"
                        }, children: [_jsxs("div", { className: "card", children: [_jsx("h3", { children: "\uD83D\uDD27 Eletricista" }), _jsx("p", { children: "Instala\u00E7\u00F5es e repara\u00E7\u00F5es el\u00E9tricas." })] }), _jsxs("div", { className: "card", children: [_jsx("h3", { children: "\uD83D\uDEB0 Canalizador" }), _jsx("p", { children: "Repara\u00E7\u00F5es hidr\u00E1ulicas e manuten\u00E7\u00E3o." })] }), _jsxs("div", { className: "card", children: [_jsx("h3", { children: "\uD83C\uDFA8 Pintor" }), _jsx("p", { children: "Pintura residencial e comercial." })] })] }), _jsx("button", { onClick: () => navigate("/servicos"), style: {
                            display: "block",
                            margin: "30px auto",
                            background: "#061B41",
                            color: "#fff",
                            border: "none",
                            padding: "12px 25px",
                            borderRadius: "8px",
                            fontWeight: "bold",
                            cursor: "pointer"
                        }, children: "Ver todos os servi\u00E7os" })] })] }));
}
