import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function PainelCliente() {
    return (_jsx("div", { style: {
            minHeight: "100vh",
            background: "#f3f5f7",
            padding: "20px",
            fontFamily: "Arial, sans-serif",
        }, children: _jsxs("div", { style: {
                maxWidth: "1000px",
                margin: "auto",
            }, children: [_jsxs("header", { style: {
                        background: "#061B41",
                        color: "#fff",
                        padding: "25px",
                        borderRadius: "18px",
                        marginBottom: "25px",
                    }, children: [_jsx("h1", { style: { margin: 0 }, children: "LE Prime Servi\u00E7os" }), _jsx("p", { children: "Ol\u00E1, Cliente \uD83D\uDC4B" }), _jsx("button", { style: {
                                background: "#fff",
                                color: "#061B41",
                                border: "none",
                                padding: "12px 20px",
                                borderRadius: "8px",
                                fontWeight: "bold",
                                cursor: "pointer",
                            }, children: "+ Novo pedido" })] }), _jsx("h2", { style: { color: "#061B41" }, children: "Meus servi\u00E7os" }), _jsxs("div", { style: {
                        display: "grid",
                        gap: "20px",
                    }, children: [_jsxs("div", { style: {
                                background: "#fff",
                                padding: "25px",
                                borderRadius: "15px",
                                boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
                            }, children: [_jsx("h3", { children: "Repara\u00E7\u00E3o residencial" }), _jsx("p", { children: "Profissional: Jo\u00E3o Silva" }), _jsx("p", { children: "Local: Lisboa" }), _jsx("p", { children: "Valor: 120 \u20AC" }), _jsx("span", { style: {
                                        background: "#fff3cd",
                                        padding: "8px 15px",
                                        borderRadius: "20px",
                                    }, children: "Em andamento" })] }), _jsxs("div", { style: {
                                background: "#fff",
                                padding: "25px",
                                borderRadius: "15px",
                                boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
                            }, children: [_jsx("h3", { children: "Limpeza residencial" }), _jsx("p", { children: "Profissional: Maria Costa" }), _jsx("p", { children: "Local: Lisboa" }), _jsx("p", { children: "Valor: 60 \u20AC" }), _jsx("span", { style: {
                                        background: "#d4edda",
                                        padding: "8px 15px",
                                        borderRadius: "20px",
                                    }, children: "Conclu\u00EDdo" }), _jsx("br", {}), _jsx("button", { style: {
                                        marginTop: "20px",
                                        background: "#061B41",
                                        color: "white",
                                        border: "none",
                                        padding: "12px 20px",
                                        borderRadius: "8px",
                                    }, children: "Avaliar profissional" })] })] })] }) }));
}
export default PainelCliente;
