function PainelCliente() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f5f7",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >

      <div
        style={{
          maxWidth: "1000px",
          margin: "auto",
        }}
      >

        <header
          style={{
            background: "#061B41",
            color: "#fff",
            padding: "25px",
            borderRadius: "18px",
            marginBottom: "25px",
          }}
        >
          <h1 style={{ margin: 0 }}>
            LE Prime Serviços
          </h1>

          <p>
            Olá, Cliente 👋
          </p>

          <button
            style={{
              background: "#fff",
              color: "#061B41",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            + Novo pedido
          </button>

        </header>


        <h2 style={{ color: "#061B41" }}>
          Meus serviços
        </h2>


        <div
          style={{
            display: "grid",
            gap: "20px",
          }}
        >


          <div
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "15px",
              boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
            }}
          >

            <h3>
              Reparação residencial
            </h3>

            <p>
              Profissional: João Silva
            </p>

            <p>
              Local: Lisboa
            </p>

            <p>
              Valor: 120 €
            </p>


            <span
              style={{
                background: "#fff3cd",
                padding: "8px 15px",
                borderRadius: "20px",
              }}
            >
              Em andamento
            </span>


          </div>



          <div
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "15px",
              boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
            }}
          >

            <h3>
              Limpeza residencial
            </h3>

            <p>
              Profissional: Maria Costa
            </p>

            <p>
              Local: Lisboa
            </p>

            <p>
              Valor: 60 €
            </p>


            <span
              style={{
                background: "#d4edda",
                padding: "8px 15px",
                borderRadius: "20px",
              }}
            >
              Concluído
            </span>


            <br />

            <button
              style={{
                marginTop: "20px",
                background: "#061B41",
                color: "white",
                border: "none",
                padding: "12px 20px",
                borderRadius: "8px",
              }}
            >
              Avaliar profissional
            </button>


          </div>


        </div>


      </div>

    </div>
  );
}

export default PainelCliente;