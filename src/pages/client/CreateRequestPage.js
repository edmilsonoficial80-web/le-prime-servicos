import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
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
import { cn } from '@/utils';
const URGENCY_HINTS = {
    low: 'Flexível',
    medium: 'Até 7 dias',
    high: 'Nas próximas 24h',
};
export const CreateRequestPage = () => {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const { user } = useAuth();
    const { notify } = useToast();
    const [form, setForm] = useState({
        categoryId: params.get('categoria') ?? '',
        title: '',
        description: '',
        address: user?.city ?? '',
        date: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
        urgency: 'medium',
        budget: '',
    });
    const [photoFiles, setPhotoFiles] = useState([]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const setField = (field, value) => setForm((current) => ({ ...current, [field]: value }));
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!user)
            return;
        const nextErrors = {};
        if (!form.categoryId)
            nextErrors.categoryId = 'Escolha uma categoria.';
        if (form.title.trim().length < 6)
            nextErrors.title = 'Dê um título claro ao pedido.';
        if (form.description.trim().length < 20)
            nextErrors.description = 'Descreva o serviço (mín. 20 caracteres).';
        if (form.address.trim().length < 5)
            nextErrors.address = 'Indique a morada do serviço.';
        if (!form.date)
            nextErrors.date = 'Escolha uma data.';
        const budget = Number(form.budget);
        if (!Number.isFinite(budget) || budget <= 0)
            nextErrors.budget = 'Indique o valor desejado.';
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length)
            return;
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
        }
        catch (error) {
            notify(error instanceof Error ? error.message : 'Não foi possível publicar o pedido.', 'error');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(TopBar, { back: true, title: "Criar pedido", subtitle: "Descreva o que precisa" }), _jsxs("form", { onSubmit: handleSubmit, className: "scroll-area space-y-5 bg-ink-50 px-5 py-5", children: [_jsxs("div", { children: [_jsx("label", { className: "field-label", children: "Categoria" }), _jsx("div", { className: "grid grid-cols-3 gap-2", children: CATEGORIES.map((category) => {
                                    const active = form.categoryId === category.id;
                                    return (_jsxs("button", { type: "button", onClick: () => setField('categoryId', category.id), className: cn('flex flex-col items-center gap-1.5 rounded-2xl border p-3 transition-all', active
                                            ? 'border-ink-900 bg-ink-900 text-brand-yellow shadow-card'
                                            : 'border-ink-100 bg-white text-ink-500'), children: [_jsx(CategoryIcon, { categoryId: category.id, size: 19 }), _jsx("span", { className: "text-center text-[10.5px] font-semibold leading-tight", children: category.name })] }, category.id));
                                }) }), errors.categoryId && _jsx("p", { className: "mt-1.5 text-xs font-medium text-red-600", children: errors.categoryId })] }), _jsxs("div", { className: "space-y-4 rounded-3xl bg-white p-4 shadow-soft", children: [_jsx(Input, { label: "T\u00EDtulo do pedido", placeholder: "Ex.: Substituir quadro el\u00E9trico", value: form.title, error: errors.title, onChange: (event) => setField('title', event.target.value) }), _jsx(Textarea, { label: "Descri\u00E7\u00E3o", rows: 5, maxLength: 600, placeholder: "Explique o problema, dimens\u00F5es, materiais e qualquer detalhe importante.", hint: `${form.description.length}/600 caracteres`, value: form.description, error: errors.description, onChange: (event) => setField('description', event.target.value) }), _jsx(ImagePicker, { label: "Fotos (opcional)", hint: "Fotos ajudam os profissionais a or\u00E7amentar com precis\u00E3o.", files: photoFiles, onChange: setPhotoFiles, max: 4 })] }), _jsxs("div", { className: "space-y-4 rounded-3xl bg-white p-4 shadow-soft", children: [_jsx(Input, { label: "Endere\u00E7o", placeholder: "Rua, n\u00FAmero, cidade", icon: _jsx(MapPin, { size: 17 }), value: form.address, error: errors.address, onChange: (event) => setField('address', event.target.value) }), _jsx(Input, { label: "Data pretendida", type: "date", icon: _jsx(CalendarDays, { size: 17 }), value: form.date, error: errors.date, min: new Date().toISOString().slice(0, 10), onChange: (event) => setField('date', event.target.value) }), _jsxs("div", { children: [_jsx("label", { className: "field-label", children: "Urg\u00EAncia" }), _jsx("div", { className: "grid grid-cols-3 gap-2", children: Object.keys(URGENCY_LABELS).map((level) => {
                                            const active = form.urgency === level;
                                            return (_jsxs("button", { type: "button", onClick: () => setField('urgency', level), className: cn('rounded-2xl border px-2 py-2.5 text-center transition-all', active ? 'border-brand-yellow bg-gold-50' : 'border-ink-100 bg-white'), children: [_jsx("span", { className: "block text-[12.5px] font-bold text-ink-900", children: URGENCY_LABELS[level] }), _jsx("span", { className: "block text-[10px] text-ink-400", children: URGENCY_HINTS[level] })] }, level));
                                        }) })] }), _jsxs(Select, { label: "Valor desejado", value: form.budget, error: errors.budget, onChange: (event) => setField('budget', event.target.value), children: [_jsx("option", { value: "", children: "Selecione um intervalo" }), [50, 100, 200, 350, 500, 750, 1000, 2000, 5000].map((value) => (_jsxs("option", { value: value, children: ["At\u00E9 ", value, " \u20AC"] }, value)))] }), _jsx(Input, { label: "Ou indique um valor exato (\u20AC)", type: "number", inputMode: "numeric", min: 1, placeholder: "Ex.: 450", icon: _jsx(Euro, { size: 17 }), value: form.budget, onChange: (event) => setField('budget', event.target.value) })] }), _jsx(Button, { type: "submit", size: "lg", fullWidth: true, loading: loading, children: "Publicar pedido" }), _jsx("p", { className: "pb-2 text-center text-[11px] text-ink-400", children: "Publicar \u00E9 gratuito. S\u00F3 paga ao profissional escolhido." })] })] }));
};
