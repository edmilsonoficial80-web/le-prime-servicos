import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { cadastrarUsuario } from "../../data/usuariosStore";
function RegisterClientPage() {
    const [cadastrado, setCadastrado] = useState(false);
    const [form, setForm] = useState({
        nome: "",
        email: "",
        senha: "",
    });
    function alterar(campo, valor) {
        setForm({
            ...form,
            [campo]: valor,
        });
    }
    function enviar(e) {
        e.preventDefault();
        cadastrarUsuario({
            nome: form.nome,
            email: form.email,
            senha: form.senha,
            tipo: "cliente",
        });
        setCadastrado(true);
    }
    const campo = {
        width: "100%",
        padding: "12px",
        marginBottom: "15px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        boxSizing: "border-box",
    };
    return (_jsx("div", { style: {
            minHeight: "100vh",
            background: "#f3f5f7",
            padding: "30px 20px",
            fontFamily: "Arial",
        }, children: _jsx("div", { style: {
                maxWidth: "500px",
                margin: "auto",
                background: "white",
                padding: "30px",
                borderRadius: "18px",
            }, children: cadastrado ? (_jsxs(_Fragment, { children: [_jsx("h2", { children: "Cadastro realizado! \u2705" }), _jsx("p", { children: "Seu usu\u00E1rio cliente foi criado." })] })) : (_jsxs("form", { onSubmit: enviar, children: [_jsx("h1", { style: { color: "#061B41" }, children: "Cadastro Cliente" }), _jsx("input", { placeholder: "Nome", style: campo, onChange: (e) => alterar("nome", e.target.value) }), _jsx("input", { placeholder: "Email", type: "email", style: campo, onChange: (e) => alterar("email", e.target.value) }), _jsx("input", { placeholder: "Senha", type: "password", style: campo, onChange: (e) => alterar("senha", e.target.value) }), _jsx("button", { type: "submit", style: {
                            background: "#061B41",
                            color: "white",
                            border: "none",
                            padding: "14px 25px",
                            borderRadius: "10px",
                            cursor: "pointer",
                        }, children: "Criar conta" })] })) }) }));
}
export default RegisterClientPage;
