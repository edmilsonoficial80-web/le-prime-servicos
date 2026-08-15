import { useEffect, useRef, useState } from 'react';
import { Camera, Plus, X } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { cn } from '@/utils';

interface ImagePickerProps {
  label?: string;
  hint?: string;
  files: File[];
  onChange: (files: File[]) => void;
  max?: number;
  accept?: string;
}

/** Seletor de várias imagens com pré-visualização (portfólio, fotos do pedido). */
export const ImagePicker = ({
  label,
  hint,
  files,
  onChange,
  max = 6,
  accept = 'image/*',
}: ImagePickerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [files]);

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files ?? []);
    onChange([...files, ...selected].slice(0, max));
    event.target.value = '';
  };

  return (
    <div>
      {label && <label className="field-label">{label}</label>}
      <div className="grid grid-cols-3 gap-2.5">
        {previews.map((preview, index) => (
          <div key={preview} className="relative aspect-square overflow-hidden rounded-2xl bg-ink-100">
            <img src={preview} alt={`Imagem ${index + 1}`} className="h-full w-full object-cover" />
            <button
              type="button"
              aria-label="Remover imagem"
              onClick={() => onChange(files.filter((_, i) => i !== index))}
              className="absolute right-1.5 top-1.5 rounded-full bg-ink-900/80 p-1 text-white"
            >
              <X size={13} />
            </button>
          </div>
        ))}

        {files.length < max && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex aspect-square flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-ink-200 text-ink-400 transition-colors hover:border-brand-yellow hover:text-brand-yellow"
          >
            <Plus size={20} />
            <span className="text-[11px] font-semibold">Adicionar</span>
          </button>
        )}
      </div>
      {hint && <p className="mt-2 text-xs text-ink-400">{hint}</p>}
      <input ref={inputRef} type="file" accept={accept} multiple hidden onChange={handleSelect} />
    </div>
  );
};

interface AvatarPickerProps {
  name: string;
  file: File | null;
  currentUrl?: string;
  onChange: (file: File | null) => void;
  size?: number;
}

/** Seletor de foto de perfil com pré-visualização circular. */
export const AvatarPicker = ({ name, file, currentUrl, onChange, size = 96 }: AvatarPickerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | undefined>(currentUrl);

  useEffect(() => {
    if (!file) {
      setPreview(currentUrl);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file, currentUrl]);

  return (
    <div className="flex flex-col items-center gap-2">
      <button type="button" onClick={() => inputRef.current?.click()} className="relative">
        <Avatar name={name || 'LE'} src={preview} size={size} />
        <span className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-brand-yellow text-ink-900">
          <Camera size={15} />
        </span>
      </button>
      <span className="text-xs font-medium text-ink-400">Toque para alterar a foto</span>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(event) => onChange(event.target.files?.[0] ?? null)}
      />
    </div>
  );
};

interface FilePickerProps {
  label: string;
  hint?: string;
  file: File | null;
  onChange: (file: File | null) => void;
  accept?: string;
}

/** Seletor de um único ficheiro (documento de identificação). */
export const FilePicker = ({ label, hint, file, onChange, accept = 'image/*,.pdf' }: FilePickerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <label className="field-label">{label}</label>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={cn(
          'flex w-full items-center gap-3 rounded-2xl border-2 border-dashed px-4 py-4 text-left transition-colors',
          file ? 'border-brand-yellow bg-gold-50' : 'border-ink-200 hover:border-ink-300',
        )}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-900 text-brand-yellow">
          <Camera size={17} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-ink-900">
            {file ? file.name : 'Carregar ficheiro'}
          </span>
          <span className="block text-xs text-ink-400">{file ? 'Toque para substituir' : hint}</span>
        </span>
        {file && (
          <span
            role="button"
            tabIndex={0}
            aria-label="Remover ficheiro"
            onClick={(event) => {
              event.stopPropagation();
              onChange(null);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') onChange(null);
            }}
            className="rounded-full bg-ink-900/80 p-1 text-white"
          >
            <X size={13} />
          </span>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        hidden
        onChange={(event) => onChange(event.target.files?.[0] ?? null)}
      />
    </div>
  );
};
