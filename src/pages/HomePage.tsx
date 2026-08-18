import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ServicosDisponiveis from "../components/ServicosDisponiveis";

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const headers = document.querySelectorAll("header");

    headers.forEach((header) => {
      const element = header as HTMLElement;

      if (!element.dataset.homeHidden) {
        element.dataset.homeHidden = "true";
        element.style.display = "none";
      }
    });

    return () => {
      headers.forEach((header) => {
        const element = header as HTMLElement;

        if (element.dataset.homeHidden === "true") {
          element.style.display = "";
          delete element.dataset.homeHidden;
        }
      });
    };
  }, []);

  return (
    <main
      style={{
        width: "100%",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        overflowX: "hidden",
        background: "#ffffff",
      }}
    >
      {/* SECÇÃO PRINCIPAL DA IMAGEM CORTADA */}
      <section
        style={{
          position: "relative",
          width: "100%",
          margin: 0,
          padding: 0,
          lineHeight: 0,
        }}
      >
        <img
          src="/hero-profissional.jpg"
          alt="L&E Prime Serviços"
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            margin: 0,
            padding: 0,
          }}
        />

        {/* QUERO CONTRATAR */}
        <button
          type="button"
          onClick={() => navigate("/servicos")}
          aria-label="Quero contratar"
          style={{
            position: "absolute",
            left: "6.1%",
            top: "58%",
            width: "23.5%",
            height: "14%",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            zIndex: 9999,
          }}
        />

        {/* SOU PROFISSIONAL */}
        <button
          type="button"
          onClick={() => navigate("/registro/profissional")}
          aria-label="Sou profissional"
          style={{
            position: "absolute",
            left: "31.4%",
            top: "58%",
            width: "15.5%",
            height: "14%",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            zIndex: 9999,
          }}
        />

        {/* INÍCIO */}
        <button
          type="button"
          onClick={() => navigate("/")}
          aria-label="Início"
          style={{
            position: "absolute",
            left: "30.5%",
            top: "7%",
            width: "5.5%",
            height: "12%",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            zIndex: 9999,
          }}
        />

        {/* SERVIÇOS */}
        <button
          type="button"
          onClick={() => navigate("/servicos")}
          aria-label="Serviços"
          style={{
            position: "absolute",
            left: "36.2%",
            top: "7%",
            width: "6%",
            height: "12%",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            zIndex: 9999,
          }}
        />

        {/* PROFISSIONAIS */}
        <button
          type="button"
          onClick={() => navigate("/profissionais")}
          aria-label="Profissionais"
          style={{
            position: "absolute",
            left: "42.5%",
            top: "7%",
            width: "8%",
            height: "12%",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            zIndex: 9999,
          }}
        />

        {/* COMO FUNCIONA */}
        <button
          type="button"
          onClick={() => navigate("/como-funciona")}
          aria-label="Como funciona"
          style={{
            position: "absolute",
            left: "51.5%",
            top: "7%",
            width: "7.5%",
            height: "12%",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            zIndex: 9999,
          }}
        />

        {/* SOBRE NÓS */}
        <button
          type="button"
          onClick={() => navigate("/sobre-nos")}
          aria-label="Sobre nós"
          style={{
            position: "absolute",
            left: "59%",
            top: "7%",
            width: "7%",
            height: "12%",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            zIndex: 9999,
          }}
        />

        {/* CONTATO */}
        <button
          type="button"
          onClick={() => navigate("/contato")}
          aria-label="Contato"
          style={{
            position: "absolute",
            left: "69.5%",
            top: "7%",
            width: "7%",
            height: "12%",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            zIndex: 9999,
          }}
        />

        {/* ENTRAR */}
        <button
          type="button"
          onClick={() => navigate("/login")}
          aria-label="Entrar"
          style={{
            position: "absolute",
            left: "77.5%",
            top: "6.5%",
            width: "7.5%",
            height: "13%",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            zIndex: 9999,
          }}
        />

        {/* REGISTRAR */}
        <button
          type="button"
          onClick={() => navigate("/registro")}
          aria-label="Registrar"
          style={{
            position: "absolute",
            left: "87.5%",
            top: "5%",
            width: "11.5%",
            height: "15%",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            zIndex: 9999,
          }}
        />
      </section>

      {/* BLOCO ÚNICO E DINÂMICO DE SERVIÇOS */}
      <div style={{ padding: "40px 20px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#0f172a", margin: "0 0 8px 0" }}>
          Serviços disponíveis
        </h2>
        <p style={{ color: "#64748b", fontSize: "0.95rem", margin: "0 0 24px 0" }}>
          Encontre o serviço que precisa entre as várias categorias disponíveis.
        </p>
        <ServicosDisponiveis />
      </div>
    </main>
  );
}