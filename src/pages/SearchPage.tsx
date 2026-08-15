import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchX } from 'lucide-react';
import { ProfessionalCard } from '@/components/cards/ProfessionalCard';
import { RequestCard } from '@/components/cards/RequestCard';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { SearchBar } from '@/components/home/SearchBar';
import { TopBar } from '@/components/layout/TopBar';
import { EmptyState, ListSkeleton } from '@/components/ui/Feedback';
import { getCategory } from '@/constants/categories';
import { toggleFavorite } from '@/services/userService';
import { useAuth } from '@/hooks/useAuth';
import { useProfessionals } from '@/hooks/useProfessionals';
import { useOpenRequests } from '@/hooks/useRequests';
import { cn } from '@/utils';

type Tab = 'profissionais' | 'pedidos';

export const SearchPage = () => {
  const [params, setParams] = useSearchParams();
  const { user, isProfessional } = useAuth();

  const [tab, setTab] = useState<Tab>(params.get('tipo') === 'pedidos' || isProfessional ? 'pedidos' : 'profissionais');
  const [term, setTerm] = useState(params.get('q') ?? '');
  const category = params.get('categoria') ?? '';

  const { data: professionals, loading: loadingPros } = useProfessionals();
  const { data: requests, loading: loadingRequests } = useOpenRequests();

  const setCategory = (categoryId: string) => {
    const next = new URLSearchParams(params);
    if (categoryId) next.set('categoria', categoryId);
    else next.delete('categoria');
    setParams(next, { replace: true });
  };

  const normalized = term.trim().toLowerCase();

  const filteredProfessionals = useMemo(
    () =>
      professionals.filter((professional) => {
        const matchesCategory = !category || professional.specialty === category;
        const matchesTerm =
          !normalized ||
          professional.name.toLowerCase().includes(normalized) ||
          professional.city.toLowerCase().includes(normalized) ||
          professional.description.toLowerCase().includes(normalized) ||
          getCategory(professional.specialty).name.toLowerCase().includes(normalized);
        return matchesCategory && matchesTerm;
      }),
    [professionals, category, normalized],
  );

  const filteredRequests = useMemo(
    () =>
      requests.filter((request) => {
        const matchesCategory = !category || request.categoryId === category;
        const matchesTerm =
          !normalized ||
          request.title.toLowerCase().includes(normalized) ||
          request.description.toLowerCase().includes(normalized) ||
          request.address.toLowerCase().includes(normalized);
        return matchesCategory && matchesTerm;
      }),
    [requests, category, normalized],
  );

  const favorites = user?.favorites ?? [];

  return (
    <>
      <TopBar back title="Procurar" />

      <div className="border-b border-ink-100 bg-white px-5 pb-4">
        <SearchBar value={term} onChange={setTerm} placeholder="Serviço, profissional ou cidade" />

        <div className="mt-3">
          <CategoryGrid layout="scroll" activeId={category} onSelect={setCategory} />
        </div>

        <div className="mt-3 flex rounded-2xl bg-ink-100 p-1">
          {(['profissionais', 'pedidos'] as Tab[]).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setTab(value)}
              className={cn(
                'flex-1 rounded-xl py-2 text-[13px] font-bold capitalize transition-colors',
                tab === value ? 'bg-white text-ink-900 shadow-soft' : 'text-ink-400',
              )}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      <div className="scroll-area bg-ink-50 px-5 py-4">
        {tab === 'profissionais' ? (
          loadingPros ? (
            <ListSkeleton count={4} />
          ) : filteredProfessionals.length ? (
            <div className="space-y-2.5">
              <p className="text-[12px] font-medium text-ink-400">
                {filteredProfessionals.length} profissionais encontrados
              </p>
              {filteredProfessionals.map((professional) => (
                <ProfessionalCard
                  key={professional.uid}
                  professional={professional}
                  isFavorite={favorites.includes(professional.uid)}
                  onToggleFavorite={user ? (id) => void toggleFavorite(user.uid, id) : undefined}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<SearchX size={22} />}
              title="Sem resultados"
              description="Experimente outra categoria ou termo de pesquisa."
            />
          )
        ) : loadingRequests ? (
          <ListSkeleton count={3} height={150} />
        ) : filteredRequests.length ? (
          <div className="space-y-3">
            <p className="text-[12px] font-medium text-ink-400">{filteredRequests.length} pedidos abertos</p>
            {filteredRequests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                to={isProfessional ? `/profissional/servicos/${request.id}` : `/pedido/${request.id}`}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<SearchX size={22} />}
            title="Sem pedidos"
            description="Ainda não existem pedidos abertos com estes filtros."
          />
        )}
      </div>
    </>
  );
};
