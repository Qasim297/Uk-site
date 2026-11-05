'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useId, useState, useTransition } from 'react';
import { Loader2, Search } from 'lucide-react';
import { isValidReg, normaliseReg } from '@/lib/registration';
import type { CheckType } from '@/lib/site';

interface Props {
  checkType?: CheckType;
  buttonLabel?: string;
  size?: 'lg' | 'md';
  defaultValue?: string;
}

export default function RegSearch({ checkType = 'full', buttonLabel = 'Check Vehicle', size = 'lg', defaultValue = '' }: Props) {
  const router = useRouter();
  const id = useId();
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState('');
  const [pending, startTransition] = useTransition();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const reg = normaliseReg(value);
    if (!reg) return setError('Please enter a vehicle registration number.');
    if (!isValidReg(reg)) return setError('That doesn’t look like a valid UK registration, e.g. AB12 CDE.');
    setError('');
    startTransition(() => router.push(`/check?reg=${encodeURIComponent(reg)}&type=${checkType}`));
  }

  return (
    <form className={`reg-search reg-search-${size}`} onSubmit={onSubmit} noValidate role="search" aria-label="Vehicle registration search">
      <div className="reg-search-row">
        <label htmlFor={id} className="sr-only">
          Vehicle registration number
        </label>
        <div className={`plate${error ? ' has-error' : ''}`}>
          <span className="plate-band" aria-hidden="true">
            <svg viewBox="0 0 20 14" width="18" height="13">
              <circle cx="10" cy="7" r="5.2" fill="none" stroke="#ffd400" strokeWidth="1.3" strokeDasharray="1.2 1.6" />
            </svg>
            UK
          </span>
          <input
            id={id}
            className="plate-input"
            value={value}
            onChange={(e) => {
              setValue(e.target.value.toUpperCase());
              if (error) setError('');
            }}
            placeholder="ENTER REG"
            maxLength={10}
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            inputMode="text"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-search" disabled={pending}>
          {pending ? <Loader2 size={20} className="spin" /> : <Search size={20} />}
          <span>{pending ? 'Checking…' : buttonLabel}</span>
        </button>
      </div>
      {error && (
        <p className="field-error" id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
