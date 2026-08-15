import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpeg";
export default function Header() {
    const navigate = useNavigate();
    const cliente = localStorage.getItem("cliente_logado");
    const profissional = localStorage.getItem("profissional_logado");
    const admin = localStorage.getItem("admin_logado");
    const logado = cliente || profissional || admin;
    function sair() {
        localStorage.removeItem("cliente_logado");
        localStorage.removeItem("profissional_logado");
        localStorage.removeItem("admin_logado");
        navigate("/");
    }
    return (_jsxs("header", { style: {
            background: "#061B41",
            minHeight: "75px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 25px",
            boxSizing: "border-box",
            gap: "20px",
            flexWrap: "wrap",
            /* Linha divisória */
            borderBottom: "1px solid rgba(255,255,255,0.25)",
        }, children: [_jsxs("div", { onClick: () => navigate("/"), style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    cursor: "pointer",
                }, children: [_jsx("img", { src: logo, alt: "L&E Prime", style: {
                            height: "55px",
                            width: "55px",
                            borderRadius: "10px",
                            objectFit: "cover",
                        } }), _jsx("h2", { style: {
                            color: "#fff",
                            margin: 0,
                            fontSize: "22px",
                            whiteSpace: "nowrap",
                        }, children: "L&E Prime" })] }), _jsxs("nav", { style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "18px",
                    flexWrap: "wrap",
                }, children: [_jsx(Link, { to: "/", style: {
                            color: "#fff",
                            textDecoration: "none",
                            fontWeight: "500",
                        }, children: "In\u00EDcio" }), _jsx(Link, { to: "/servicos", style: {
                            color: "#fff",
                            textDecoration: "none",
                            fontWeight: "500",
                        }, children: "Servi\u00E7os" }), _jsx(Link, { to: "/profissionais", style: {
                            color: "#fff",
                            textDecoration: "none",
                            fontWeight: "500",
                        }, children: "Profissionais" }), admin && (_jsx(Link, { to: "/admin", style: {
                            color: "#B8F000",
                            textDecoration: "none",
                            fontWeight: "bold",
                        }, children: "Admin" })), logado ? (_jsx("button", { onClick: sair, style: {
                            background: "#B8F000",
                            color: "#061B41",
                            border: "none",
                            padding: "10px 18px",
                            borderRadius: "8px",
                            fontWeight: "bold",
                            cursor: "pointer",
                        }, children: "Sair" })) : (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/login", style: {
                                    color: "#fff",
                                    textDecoration: "none",
                                    fontWeight: "500",
                                }, children: "Entrar" }), _jsx(Link, { to: "/registro", style: {
                                    background: "#B8F000",
                                    color: "#061B41",
                                    textDecoration: "none",
                                    padding: "10px 18px",
                                    borderRadius: "8px",
                                    fontWeight: "bold",
                                }, children: "Registrar" })] }))] })] }));
}
