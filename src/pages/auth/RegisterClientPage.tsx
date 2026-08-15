import { useState } from "react";
import { cadastrarUsuario } from "../../data/usuariosStore";

function RegisterClientPage() {

  const [cadastrado, setCadastrado] = useState(false);

  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
  });


  function alterar(
    campo: string,
    valor: string
  ) {
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
    boxSizing: "border-box" as const,
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
          maxWidth: "500px",
          margin: "auto",
          background: "white",
          padding: "30px",
          borderRadius: "18px",
        }}
      >

        {cadastrado ? (

          <>
            <h2>
              Cadastro realizado! ✅
            </h2>

            <p>
              Seu usuário cliente foi criado.
            </p>
          </>

        ) : (

          <form onSubmit={enviar}>

            <h1 style={{color:"#061B41"}}>
              Cadastro Cliente
            </h1>


            <input
              placeholder="Nome"
              style={campo}
              onChange={(e)=>
                alterar(
                  "nome",
                  e.target.value
                )
              }
            />


            <input
              placeholder="Email"
              type="email"
              style={campo}
              onChange={(e)=>
                alterar(
                  "email",
                  e.target.value
                )
              }
            />


            <input
              placeholder="Senha"
              type="password"
              style={campo}
              onChange={(e)=>
                alterar(
                  "senha",
                  e.target.value
                )
              }
            />


            <button
              type="submit"
              style={{
                background:"#061B41",
                color:"white",
                border:"none",
                padding:"14px 25px",
                borderRadius:"10px",
                cursor:"pointer",
              }}
            >
              Criar conta
            </button>


          </form>

        )}

      </div>

    </div>
  );
}


export default RegisterClientPage;