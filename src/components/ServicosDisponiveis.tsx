import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ServicoItem {
  id: number;
  nome: string;
  slug: string;
  svg: React.ReactNode;
}

export default function ServicosDisponiveis() {
  const navigate = useNavigate();

  const iconStyle: React.CSSProperties = {
    width: '42px',
    height: '42px',
    color: '#65a30d',
    marginBottom: '12px',
    display: 'block'
  };

  const servicos: ServicoItem[] = [
    {
      id: 1,
      nome: "Elétrica",
      slug: "eletricista",
      svg: (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2v4M6 2v4M4 6h16a1 1 0 0 1 1 1v2a7 7 0 0 1-7 7h-4a7 7 0 0 1-7-7V7a1 1 0 0 1 1-1z" />
          <path d="M12 16v6" />
        </svg>
      )
    },
    {
      id: 2,
      nome: "Pichileiro",
      slug: "pichileiro",
      svg: (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          <path d="M12 12v4M10 14h4" />
        </svg>
      )
    },
    {
      id: 26,
      nome: "Desentupimento",
      slug: "desentupimento",
      svg: (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v10M8 12h8M6 16c0 3.3 2.7 6 6 6s6-2.7 6-6H6z" />
        </svg>
      )
    },
    {
      id: 27,
      nome: "Limpeza pós-obra / Comercial",
      slug: "limpeza-pos-obra-comercial",
      svg: (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18M19 21v-8a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v8M9 3l10 4M9 3v8M13 5.5v5.5" />
        </svg>
      )
    },
    {
      id: 8,
      nome: "Wallbox de carro",
      slug: "wallbox",
      svg: (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="12" height="7" rx="2" />
          <circle cx="6" cy="18" r="1.5" />
          <circle cx="12" cy="18" r="1.5" />
          <path d="M17 9v8a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2v-4M19 7v2" />
        </svg>
      )
    },
    {
      id: 18,
      nome: "Estores e Janelas",
      slug: "vidros-janelas",
      svg: (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="3" width="16" height="18" rx="1" />
          <path d="M12 3v18M4 12h16" />
        </svg>
      )
    },
    {
      id: 7,
      nome: "Pladur",
      slug: "pladur",
      svg: (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="4" width="14" height="16" rx="2" />
          <path d="M9 8h6M9 12h6M9 16h4" />
        </svg>
      )
    },
    {
      id: 3,
      nome: "Pincelaria e Pintura",
      slug: "pintor",
      svg: (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="3" width="16" height="7" rx="2" />
          <path d="M8 10v3a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-3M12 15v6" />
        </svg>
      )
    },
    {
      id: 25,
      nome: "Remodelação",
      slug: "remodelacao",
      svg: (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      )
    },
    {
      id: 9,
      nome: "Ar condicionado",
      slug: "ar-condicionado",
      svg: (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="6" width="18" height="8" rx="2" />
          <path d="M7 18v1M12 18v2M17 18v1" />
        </svg>
      )
    },
    {
      id: 10,
      nome: "Painéis solares",
      slug: "paineis-solares",
      svg: (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="4 14 8 6 16 6 20 14 4 14" />
          <path d="M12 6v8M8 10h8M6 18h12M12 14v4" />
        </svg>
      )
    },
    {
      id: 11,
      nome: "Jardinagem",
      slug: "jardinagem",
      svg: (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22v-9" />
          <path d="M12 13C12 7 7 4 3 5c0 6 4 10 9 8z" />
          <path d="M12 13C12 7 17 4 21 5c0 6-4 10-9 8z" />
        </svg>
      )
    },
    {
      id: 12,
      nome: "Carpintaria",
      slug: "carpintaria",
      svg: (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 3l3 3-10 10-4 1 1-4L18 3zM14 7l3 3" />
        </svg>
      )
    },
    {
      id: 14,
      nome: "Manutenção predial",
      slug: "manutencao-predial",
      svg: (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18" />
          <path d="M10 6h1M14 6h1M10 10h1M14 10h1M10 14h1M14 14h1" />
        </svg>
      )
    },
    {
      id: 15,
      nome: "Impermeabilização",
      slug: "impermeabilizacao",
      svg: (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      )
    },
    {
      id: 16,
      nome: "Isolamento térmico",
      slug: "isolamento-termico",
      svg: (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 10l9-7 9 7v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10z" />
          <path d="M12 14v4" />
        </svg>
      )
    },
    {
      id: 19,
      nome: "Domótica",
      slug: "domotica",
      svg: (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 10l9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10z" />
          <path d="M12 9a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
        </svg>
      )
    },
    {
      id: 20,
      nome: "Câmaras de segurança",
      slug: "camaras-seguranca",
      svg: (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 10l5-3v10l-5-3V10z" />
          <rect x="3" y="7" width="13" height="10" rx="2" />
        </svg>
      )
    },
    {
      id: 21,
      nome: "Alarmes",
      slug: "alarmes",
      svg: (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      )
    },
    {
      id: 22,
      nome: "Portões automáticos",
      slug: "portoes-automaticos",
      svg: (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="6" width="8" height="12" rx="1" />
          <rect x="13" y="6" width="8" height="12" rx="1" />
        </svg>
      )
    },
    {
      id: 24,
      nome: "Cada vez mais serviços",
      slug: "todos",
      svg: (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      )
    }
  ];

  const handleCardClick = (slug: string) => {
    if (slug === 'todos') {
      navigate('/servicos');
    } else {
      navigate(`/profissionais/${slug}`);
    }
  };

  return (
    <section style={{ backgroundColor: '#ffffff', padding: '10px 20px 60px 20px', textAlign: 'center' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: '16px'
        }}>
          {servicos.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCardClick(item.slug)}
              style={{
                backgroundColor: '#f7fee7',
                borderRadius: '16px',
                padding: '20px 12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #84cc16',
                boxShadow: '0 4px 12px rgba(132, 204, 22, 0.12)',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(132, 204, 22, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(132, 204, 22, 0.12)';
              }}
            >
              {item.svg}
              <span style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0f172a', textAlign: 'center', lineHeight: '1.2' }}>
                {item.nome}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}