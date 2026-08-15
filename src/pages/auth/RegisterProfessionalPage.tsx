
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

  function alterar(campo: string, valor: string) {
    setForm({
      ...form,
      [campo]: valor,
    });
  }

  function enviar(e: React.FormEvent) {
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
} as any);

    setCadastrado(true);
  }

  const campo = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    boxSizing: "border-box" as const,
    fontSize: "15px",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f5f7",
        padding: "30px 20px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          maxWidth: "550px",
          margin: "auto",
          background: "white",
          padding: "30px",
          borderRadius: "18px",
        }}
      >
        {cadastrado ? (
          <>
            <h2 style={{ color: "#061B41" }}>
              Cadastro realizado! ✅
            </h2>

            <p>
              Seu perfil profissional foi criado com sucesso.
            </p>

            <p>
              Agora você já pode entrar como profissional.
            </p>
          </>
        ) : (
          <form onSubmit={enviar}>
            <h1 style={{ color: "#061B41" }}>
              Cadastro Profissional
            </h1>

            <label>Nome completo</label>

            <input
              placeholder="Seu nome"
              style={campo}
              value={form.nome}
              onChange={(e) =>
                alterar("nome", e.target.value)
              }
              required
            />

            <label>Email</label>

            <input
              placeholder="Seu email"
              type="email"
              style={campo}
              value={form.email}
              onChange={(e) =>
                alterar("email", e.target.value)
              }
              required
            />

            <label>Senha</label>

            <input
              placeholder="Sua senha"
              type="password"
              style={campo}
              value={form.senha}
              onChange={(e) =>
                alterar("senha", e.target.value)
              }
              required
            />

            <label>Especialidade</label>

            <input
              placeholder="Ex: Eletricista"
              style={campo}
              value={form.especialidade}
              onChange={(e) =>
                alterar(
                  "especialidade",
                  e.target.value
                )
              }
              required
            />

            <label>Zona de atendimento</label>

            <input
              placeholder="Ex: Lisboa e arredores"
              style={campo}
              value={form.zona}
              onChange={(e) =>
                alterar("zona", e.target.value)
              }
              required
            />

            <label>Telefone</label>

            <input
              placeholder="Seu telefone"
              type="tel"
              style={campo}
              value={form.telefone}
              onChange={(e) =>
                alterar("telefone", e.target.value)
              }
            />

            <label>WhatsApp</label>

            <input
              placeholder="Seu WhatsApp"
              type="tel"
              style={campo}
              value={form.whatsapp}
              onChange={(e) =>
                alterar("whatsapp", e.target.value)
              }
            />

            <label>Sobre você</label>

            <textarea
              placeholder="Descreva sua experiência e os serviços que realiza"
              style={{
                ...campo,
                minHeight: "120px",
                resize: "vertical",
              }}
              value={form.descricao}
              onChange={(e) =>
                alterar("descricao", e.target.value)
              }
              required
            />

            <button
              type="submit"
              style={{
                width: "100%",
                background: "#061B41",
                color: "white",
                border: "none",
                padding: "14px",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Criar conta profissional
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default RegisterProfessionalPage;