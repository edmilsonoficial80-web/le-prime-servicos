import { useState } from 'react';
import { Info, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

/** Aviso discreto quando a aplicação corre sem credenciais do Firebase. */
export const DemoBanner = () => {
  const { isDemoMode } = useAuth();
  const [dismissed, setDismissed] = useState(false);

  if (!isDemoMode || dismissed) return null;

  return (
    <div className="flex items-center gap-2 bg-ink-900 px-4 py-2 text-[11px] font-medium text-brand-yellow safe-top">
      <Info size={13} className="shrink-0" />
      <p className="flex-1 leading-tight">
        Modo demonstração — dados locais. Configure o <span className="font-bold">.env</span> para ligar ao Firebase.
      </p>
      <button type="button" onClick={() => setDismissed(true)} aria-label="Ocultar aviso">
        <X size={13} />
      </button>
    </div>
  );
};
