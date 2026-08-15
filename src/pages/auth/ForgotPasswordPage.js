import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Mail } from 'lucide-react';
import { TopBar } from '@/components/layout/TopBar';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { authErrorMessage, resetPassword } from '@/services/authService';
import { useToast } from '@/hooks/useToast';
import { isValidEmail } from '@/utils';
export const ForgotPasswordPage = () => {
    const { notify } = useToast();
    const [email, setEmail] = useState('');
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isValidEmail(email)) {
            setError('Introduza um email válido.');
            return;
        }
        setError(undefined);
        setLoading(true);
        try {
            await resetPassword(email);
            setSent(true);
        }
        catch (caught) {
            notify(authErrorMessage(caught), 'error');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(TopBar, { back: true, title: "Recuperar palavra-passe" }), _jsx("div", { className: "scroll-area px-6 py-8", children: sent ? (_jsxs("div", { className: "flex flex-col items-center py-10 text-center", children: [_jsx("span", { className: "flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-100 text-gold-700", children: _jsx(CheckCircle2, { size: 30 }) }), _jsx("h2", { className: "mt-5 text-xl font-bold", children: "Verifique o seu email" }), _jsxs("p", { className: "mt-2 max-w-[300px] text-sm leading-relaxed text-ink-400", children: ["Envi\u00E1mos um link de recupera\u00E7\u00E3o para ", _jsx("span", { className: "font-semibold text-ink-700", children: email }), ". Siga as instru\u00E7\u00F5es para definir uma nova palavra-passe."] }), _jsx(Link, { to: "/entrar", className: "mt-7 w-full", children: _jsx(Button, { size: "lg", fullWidth: true, children: "Voltar ao in\u00EDcio de sess\u00E3o" }) })] })) : (_jsxs(_Fragment, { children: [_jsx("h1", { className: "font-display text-[26px] font-extrabold leading-tight", children: "Esqueceu-se da palavra-passe?" }), _jsx("p", { className: "mt-2 text-sm leading-relaxed text-ink-400", children: "Indique o email associado \u00E0 sua conta e enviaremos um link para criar uma nova palavra-passe." }), _jsxs("form", { onSubmit: handleSubmit, className: "mt-7 space-y-5", children: [_jsx(Input, { label: "Email", type: "email", inputMode: "email", placeholder: "nome@email.com", icon: _jsx(Mail, { size: 17 }), value: email, error: error, onChange: (event) => setEmail(event.target.value) }), _jsx(Button, { type: "submit", size: "lg", fullWidth: true, loading: loading, children: "Enviar link de recupera\u00E7\u00E3o" })] })] })) })] }));
};
