import { useState, type FormEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CalendarDays, Euro, MapPin } from 'lucide-react';
import { TopBar } from '@/components/layout/TopBar';
import { CategoryIcon } from '@/components/ui/CategoryIcon';
import { Button } from '@/components/ui/Button';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { ImagePicker } from '@/components/ui/ImagePicker';
import { CATEGORIES, URGENCY_LABELS } from '@/constants/categories';
import { createRequest } from '@/services/requestService';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import type { Urgency } from '@/types';
import { cn } from '@/utils';

interface FormState {
  categoryId: string;
  title: string;
  description: string;
  address: string;
  date: string;
  urgency: Urgency;
  budget: string;
}

const URGENCY_HINTS: Record<Urgency, string> = {
  low: 'Flexível',
  medium: 'Até 7 dias',
  high: 'Nas próximas 24h',
};

export const CreateRequestPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { user } = useAuth();
  const { notify } = useToast();

  const [form, setForm] = useState<FormState>({
    categoryId: params.get('categoria') ?? '',
    title: '',
    description: '',
    address: user?.city ?? '',
    date: new Date(Date.now() + 86_400_000).toISOString().slice(0, 10),
    urgency: 'medium',
    budget: '',
  });
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [loading, setLoading] = useState(false);

  const setField = <K extends keyof FormState>(field: K, value: FormState[K]) =>
    setForm((current) => ({ ...current, [field]: value }));

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!user) return;

    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.categoryId) nextErrors.categoryId = 'Escolha uma categoria.';
    if (form.title.trim().length < 6) nextErrors.title = 'Dê um título claro ao pedido.';
    if (form.description.trim().length < 20) nextErrors.description = 'Descreva o serviço (mín. 20 caracteres).';
    if (form.address.trim().length < 5) nextErrors.address = 'Indique a morada do serviço.';
    if (!form.date) nextErrors.date = 'Escolha uma data.';
    const budget = Number(form.budget);
    if (!Number.isFinite(budget) || budget <= 0) nextErrors.budget = 'Indique o valor desejado.';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setLoading(true);
    try {
      const requestId = await createRequest(user, {
        categoryId: form.categoryId,
        title: form.title,
        description: form.description,
        address: form.address,
        date: form.date,
        urgency: form.urgency,
        budget,
        photoFiles,
      });
      notify('Pedido publicado! Vai começar a receber propostas.', 'success');
      navigate(`/cliente/pedidos/${requestId}`, { replace: true });
    } catch (error) {
      notify(error instanceof Error ? error.message : 'Não foi possível publicar o pedido.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TopBar back title="Criar pedido" subtitle="Descreva o que precisa" />

      <form onSubmit={handleSubmit} className="scroll-area space-y-5 bg-ink-50 px-5 py-5">
        <div>
          <label className="field-label">Categoria</label>
          <div className="grid grid-cols-3 gap-2">
            {CATEGORIES.map((category) => {
              const active = form.categoryId === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setField('categoryId', category.id)}
                  className={cn(
                    'flex flex-col items-center gap-1.5 rounded-2xl border p-3 transition-all',
                    active
                      ? 'border-ink-900 bg-ink-900 text-brand-yellow shadow-card'
                      : 'border-ink-100 bg-white text-ink-500',
                  )}
                >
                  <CategoryIcon categoryId={category.id} size={19} />
                  <span className="text-center text-[10.5px] font-semibold leading-tight">{category.name}</span>
                </button>
              );
            })}
          </div>
          {errors.categoryId && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.categoryId}</p>}
        </div>

        <div className="space-y-4 rounded-3xl bg-white p-4 shadow-soft">
          <Input
            label="Título do pedido"
            placeholder="Ex.: Substituir quadro elétrico"
            value={form.title}
            error={errors.title}
            onChange={(event) => setField('title', event.target.value)}
          />

          <Textarea
            label="Descrição"
            rows={5}
            maxLength={600}
            placeholder="Explique o problema, dimensões, materiais e qualquer detalhe importante."
            hint={`${form.description.length}/600 caracteres`}
            value={form.description}
            error={errors.description}
            onChange={(event) => setField('description', event.target.value)}
          />

          <ImagePicker
            label="Fotos (opcional)"
            hint="Fotos ajudam os profissionais a orçamentar com precisão."
            files={photoFiles}
            onChange={setPhotoFiles}
            max={4}
          />
        </div>

        <div className="space-y-4 rounded-3xl bg-white p-4 shadow-soft">
          <Input
            label="Endereço"
            placeholder="Rua, número, cidade"
            icon={<MapPin size={17} />}
            value={form.address}
            error={errors.address}
            onChange={(event) => setField('address', event.target.value)}
          />

          <Input
            label="Data pretendida"
            type="date"
            icon={<CalendarDays size={17} />}
            value={form.date}
            error={errors.date}
            min={new Date().toISOString().slice(0, 10)}
            onChange={(event) => setField('date', event.target.value)}
          />

          <div>
            <label className="field-label">Urgência</label>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(URGENCY_LABELS) as Urgency[]).map((level) => {
                const active = form.urgency === level;
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setField('urgency', level)}
                    className={cn(
                      'rounded-2xl border px-2 py-2.5 text-center transition-all',
                      active ? 'border-brand-yellow bg-gold-50' : 'border-ink-100 bg-white',
                    )}
                  >
                    <span className="block text-[12.5px] font-bold text-ink-900">{URGENCY_LABELS[level]}</span>
                    <span className="block text-[10px] text-ink-400">{URGENCY_HINTS[level]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <Select label="Valor desejado" value={form.budget} error={errors.budget} onChange={(event) => setField('budget', event.target.value)}>
            <option value="">Selecione um intervalo</option>
            {[50, 100, 200, 350, 500, 750, 1000, 2000, 5000].map((value) => (
              <option key={value} value={value}>
                Até {value} €
              </option>
            ))}
          </Select>

          <Input
            label="Ou indique um valor exato (€)"
            type="number"
            inputMode="numeric"
            min={1}
            placeholder="Ex.: 450"
            icon={<Euro size={17} />}
            value={form.budget}
            onChange={(event) => setField('budget', event.target.value)}
          />
        </div>

        <Button type="submit" size="lg" fullWidth loading={loading}>
          Publicar pedido
        </Button>
        <p className="pb-2 text-center text-[11px] text-ink-400">Publicar é gratuito. Só paga ao profissional escolhido.</p>
      </form>
    </>
  );
};
