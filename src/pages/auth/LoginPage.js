import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { loginUsuario } from "../../data/usuariosStore";
import { useNavigate } from "react-router-dom";
function LoginPage() {
    const navigate = useNavigate();
    const [tipo, setTipo] = useState("cliente");
    const [erro, setErro] = useState("");
    const [form, setForm] = useState({
        email: "",
        senha: "",
    });
    function alterar(campo, valor) {
        setForm({
            ...form,
            [campo]: valor,
        });
        setErro("");
    }
    function selecionarTipo(novoTipo) {
        setTipo(novoTipo);
        setErro("");
    }
    function entrar(e) {
        e.preventDefault();
        setErro("");
        /*
          =========================
          LOGIN ADMINISTRADOR
          =========================
        */
        if (tipo === "administrador") {
            if (form.email.trim() ===
                "admin@leprime.com" &&
                form.senha === "123456") {
                localStorage.setItem("admin_logado", "true");
                navigate("/admin");
                return;
            }
            setErro("Email ou senha do administrador incorretos.");
            return;
        }
        /*
          =========================
          LOGIN CLIENTE / PROFISSIONAL
          =========================
        */
        const usuario = loginUsuario(form.email.trim(), form.senha);
        if (!usuario) {
            setErro("Email ou senha incorretos.");
            return;
        }
        if (usuario.tipo !== tipo) {
            setErro("Este usuário não pertence a este perfil.");
            return;
        }
        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
        if (tipo === "cliente") {
            navigate("/painel-cliente");
            return;
        }
        if (tipo === "profissional") {
            navigate("/painel-profissional");
            return;
        }
    }
    const campo = {
        width: "100%",
        padding: "12px",
        marginBottom: "15px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        boxSizing: "border-box",
        fontSize: "15px",
    };
    const botaoPerfil = (selecionado) => ({
        flex: 1,
        padding: "13px 10px",
        borderRadius: "8px",
        border: selecionado
            ? "2px solid #061B41"
            : "1px solid #ccc",
        cursor: "pointer",
        background: selecionado
            ? "#061B41"
            : "#ddd",
        color: selecionado
            ? "white"
            : "#061B41",
        fontWeight: "bold",
        fontSize: "14px",
        boxShadow: selecionado
            ? "0 3px 8px rgba(0,0,0,0.18)"
            : "none",
        transition: "all 0.2s ease",
    });
    return (_jsx("div", { style: {
            minHeight: "100vh",
            background: "#f3f5f7",
            padding: "30px 20px",
            fontFamily: "Arial",
        }, children: _jsxs("div", { style: {
                maxWidth: "500px",
                margin: "auto",
                background: "white",
                padding: "30px",
                borderRadius: "18px",
                boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
            }, children: [_jsx("h1", { style: {
                        color: "#061B41",
                        marginTop: 0,
                        marginBottom: "8px",
                    }, children: "Login" }), _jsx("h3", { style: {
                        color: "#061B41",
                        marginTop: 0,
                    }, children: "Entrar como:" }), _jsxs("div", { style: {
                        display: "flex",
                        gap: "8px",
                        marginBottom: "20px",
                    }, children: [_jsx("button", { type: "button", onClick: () => selecionarTipo("cliente"), style: botaoPerfil(tipo === "cliente"), children: "Cliente" }), _jsx("button", { type: "button", onClick: () => selecionarTipo("profissional"), style: botaoPerfil(tipo ===
                                "profissional"), children: "Profissional" }), _jsx("button", { type: "button", onClick: () => selecionarTipo("administrador"), style: botaoPerfil(tipo ===
                                "administrador"), children: "\uD83D\uDD10 Administrador" })] }), _jsxs("div", { style: {
                        background: "#eef3f9",
                        borderRadius: "8px",
                        padding: "10px 12px",
                        marginBottom: "18px",
                        color: "#061B41",
                        fontSize: "14px",
                        fontWeight: "bold",
                    }, children: ["Perfil selecionado:", " ", tipo === "cliente"
                            ? "Cliente"
                            : tipo ===
                                "profissional"
                                ? "Profissional"
                                : "Administrador"] }), erro && (_jsx("div", { style: {
                        background: "#ffe8e8",
                        color: "#b00020",
                        border: "1px solid #ffb5b5",
                        borderRadius: "8px",
                        padding: "12px",
                        marginBottom: "15px",
                        fontWeight: "bold",
                    }, children: erro })), _jsxs("form", { onSubmit: entrar, children: [_jsx("label", { style: {
                                display: "block",
                                marginBottom: "6px",
                                color: "#061B41",
                                fontWeight: "bold",
                            }, children: "Email" }), _jsx("input", { placeholder: "Digite o seu email", type: "email", value: form.email, style: campo, autoComplete: "username", onChange: (e) => alterar("email", e.target.value), required: true }), _jsx("label", { style: {
                                display: "block",
                                marginBottom: "6px",
                                color: "#061B41",
                                fontWeight: "bold",
                            }, children: "Senha" }), _jsx("input", { placeholder: "Digite a sua senha", type: "password", value: form.senha, style: campo, autoComplete: "current-password", onChange: (e) => alterar("senha", e.target.value), required: true }), _jsx("button", { type: "submit", style: {
                                width: "100%",
                                minHeight: "50px",
                                background: "#061B41",
                                color: "#ffffff",
                                border: "2px solid #061B41",
                                padding: "14px 20px",
                                borderRadius: "10px",
                                cursor: "pointer",
                                fontWeight: "bold",
                                fontSize: "16px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign: "center",
                                boxShadow: "0 3px 8px rgba(0,0,0,0.18)",
                                marginTop: "5px",
                            }, children: "Entrar" })] }), _jsx("p", { style: {
                        textAlign: "center",
                        color: "#666",
                        fontSize: "13px",
                        marginTop: "18px",
                        marginBottom: 0,
                    }, children: "Selecione o perfil correto antes de entrar." })] }) }));
}
export default LoginPage;
