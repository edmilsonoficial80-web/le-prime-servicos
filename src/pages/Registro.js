import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
export default function Registro() {
    return (_jsx("div", { style: {
            minHeight: "100vh",
            background: "#F5F7F2",
            padding: "50px 20px",
            boxSizing: "border-box",
        }, children: _jsxs("div", { style: {
                maxWidth: "600px",
                margin: "0 auto",
                background: "#fff",
                borderRadius: "15px",
                padding: "40px 30px",
                textAlign: "center",
                boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
            }, children: [_jsx("h1", { style: {
                        color: "#061B41",
                        marginTop: 0,
                    }, children: "Criar conta" }), _jsx("p", { style: {
                        color: "#555",
                        fontSize: "16px",
                    }, children: "Escolha o tipo de conta:" }), _jsxs("div", { style: {
                        display: "flex",
                        justifyContent: "center",
                        gap: "15px",
                        marginTop: "30px",
                        flexWrap: "wrap",
                    }, children: [_jsx(Link, { to: "/registro/cliente", style: {
                                textDecoration: "none",
                            }, children: _jsx("button", { style: {
                                    background: "#B8F000",
                                    color: "#061B41",
                                    border: "none",
                                    padding: "14px 22px",
                                    borderRadius: "8px",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }, children: "\uD83D\uDC64 Criar conta Cliente" }) }), _jsx(Link, { to: "/registro/profissional", style: {
                                textDecoration: "none",
                            }, children: _jsx("button", { style: {
                                    background: "#061B41",
                                    color: "#fff",
                                    border: "none",
                                    padding: "14px 22px",
                                    borderRadius: "8px",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }, children: "\uD83D\uDD27 Criar conta Profissional" }) })] })] }) }));
}
