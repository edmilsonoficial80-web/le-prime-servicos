import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { cadastrarUsuario } from "../../data/usuariosStore";
function RegisterProfessionalPage() {
    const [cadastrado, setCadastrado] = useState(false);
    const [form, setForm] = useState({
        nome: "",
        email: "",
        senha: "",
        especialidade: "",
        zona: "",
        descricao: "",
        telefone: "",
        whatsapp: "",
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
            especialidade: form.especialidade,
            zona: form.zona,
            descricao: form.descricao,
            telefone: form.telefone,
            whatsapp: form.whatsapp,
            tipo: "profissional",
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
        fontSize: "15px",
    };
    return (_jsx("div", { style: {
            minHeight: "100vh",
            background: "#f3f5f7",
            padding: "30px 20px",
            fontFamily: "Arial",
        }, children: _jsx("div", { style: {
                maxWidth: "550px",
                margin: "auto",
                background: "white",
                padding: "30px",
                borderRadius: "18px",
            }, children: cadastrado ? (_jsxs(_Fragment, { children: [_jsx("h2", { style: { color: "#061B41" }, children: "Cadastro realizado! \u2705" }), _jsx("p", { children: "Seu perfil profissional foi criado com sucesso." }), _jsx("p", { children: "Agora voc\u00EA j\u00E1 pode entrar como profissional." })] })) : (_jsxs("form", { onSubmit: enviar, children: [_jsx("h1", { style: { color: "#061B41" }, children: "Cadastro Profissional" }), _jsx("label", { children: "Nome completo" }), _jsx("input", { placeholder: "Seu nome", style: campo, value: form.nome, onChange: (e) => alterar("nome", e.target.value), required: true }), _jsx("label", { children: "Email" }), _jsx("input", { placeholder: "Seu email", type: "email", style: campo, value: form.email, onChange: (e) => alterar("email", e.target.value), required: true }), _jsx("label", { children: "Senha" }), _jsx("input", { placeholder: "Sua senha", type: "password", style: campo, value: form.senha, onChange: (e) => alterar("senha", e.target.value), required: true }), _jsx("label", { children: "Especialidade" }), _jsx("input", { placeholder: "Ex: Eletricista", style: campo, value: form.especialidade, onChange: (e) => alterar("especialidade", e.target.value), required: true }), _jsx("label", { children: "Zona de atendimento" }), _jsx("input", { placeholder: "Ex: Lisboa e arredores", style: campo, value: form.zona, onChange: (e) => alterar("zona", e.target.value), required: true }), _jsx("label", { children: "Telefone" }), _jsx("input", { placeholder: "Seu telefone", type: "tel", style: campo, value: form.telefone, onChange: (e) => alterar("telefone", e.target.value) }), _jsx("label", { children: "WhatsApp" }), _jsx("input", { placeholder: "Seu WhatsApp", type: "tel", style: campo, value: form.whatsapp, onChange: (e) => alterar("whatsapp", e.target.value) }), _jsx("label", { children: "Sobre voc\u00EA" }), _jsx("textarea", { placeholder: "Descreva sua experi\u00EAncia e os servi\u00E7os que realiza", style: {
                            ...campo,
                            minHeight: "120px",
                            resize: "vertical",
                        }, value: form.descricao, onChange: (e) => alterar("descricao", e.target.value), required: true }), _jsx("button", { type: "submit", style: {
                            width: "100%",
                            background: "#061B41",
                            color: "white",
                            border: "none",
                            padding: "14px",
                            borderRadius: "10px",
                            cursor: "pointer",
                            fontSize: "16px",
                            fontWeight: "bold",
                        }, children: "Criar conta profissional" })] })) }) }));
}
export default RegisterProfessionalPage;
