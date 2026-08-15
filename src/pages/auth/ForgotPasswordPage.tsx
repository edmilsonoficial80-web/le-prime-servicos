import { useState, type FormEvent } from 'react';
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
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
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
    } catch (caught) {
      notify(authErrorMessage(caught), 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TopBar back title="Recuperar palavra-passe" />

      <div className="scroll-area px-6 py-8">
        {sent ? (
          <div className="flex flex-col items-center py-10 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-100 text-gold-700">
              <CheckCircle2 size={30} />
            </span>
            <h2 className="mt-5 text-xl font-bold">Verifique o seu email</h2>
            <p className="mt-2 max-w-[300px] text-sm leading-relaxed text-ink-400">
              Enviámos um link de recuperação para <span className="font-semibold text-ink-700">{email}</span>. Siga as
              instruções para definir uma nova palavra-passe.
            </p>
            <Link to="/entrar" className="mt-7 w-full">
              <Button size="lg" fullWidth>
                Voltar ao início de sessão
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <h1 className="font-display text-[26px] font-extrabold leading-tight">Esqueceu-se da palavra-passe?</h1>
            <p className="mt-2 text-sm leading-relaxed text-ink-400">
              Indique o email associado à sua conta e enviaremos um link para criar uma nova palavra-passe.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <Input
                label="Email"
                type="email"
                inputMode="email"
                placeholder="nome@email.com"
                icon={<Mail size={17} />}
                value={email}
                error={error}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Button type="submit" size="lg" fullWidth loading={loading}>
                Enviar link de recuperação
              </Button>
            </form>
          </>
        )}
      </div>
    </>
  );
};
