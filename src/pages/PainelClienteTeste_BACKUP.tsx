function PainelCliente() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7f2",
        padding: "40px 20px",
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "650px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "15px",
          padding: "30px",
          boxShadow: "0 3px 15px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ color: "#061B41" }}>
          Painel Cliente funcionando
        </h1>

        <p>Teste concluído com sucesso.</p>
      </div>
    </div>
  );
}

export default PainelCliente;