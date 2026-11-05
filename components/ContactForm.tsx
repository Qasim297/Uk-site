'use client';

import { FormEvent, useState } from 'react';
import { CircleCheck, Loader2, Send } from 'lucide-react';

type Errors = Partial<Record<'name' | 'email' | 'message', string>>;

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [errorText, setErrorText] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    const local: Errors = {};
    if (String(data.name || '').trim().length < 2) local.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(data.email || '').trim())) local.email = 'Please enter a valid email address.';
    if (String(data.message || '').trim().length < 10) local.message = 'Please enter a message of at least 10 characters.';
    setErrors(local);
    if (Object.keys(local).length) return;

    setStatus('sending');
    setErrorText('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string; errors?: Errors };
      if (res.ok && json.ok) {
        setStatus('sent');
        form.reset();
      } else {
        setErrors(json.errors || {});
        setErrorText(json.error || 'Something went wrong.');
        setStatus('error');
      }
    } catch {
      setErrorText('Network error. Please try again.');
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="form-success" role="status">
        <CircleCheck size={44} />
        <h3>Thank you — message received</h3>
        <p>We aim to reply within one working day.</p>
        <button type="button" className="btn btn-outline" onClick={() => setStatus('idle')}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="form-row">
        <div className="field">
          <label htmlFor="cf-name">Full name *</label>
          <input id="cf-name" name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>
        <div className="field">
          <label htmlFor="cf-email">Email address *</label>
          <input id="cf-email" name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="cf-subject">Subject</label>
          <select id="cf-subject" name="subject" defaultValue="General enquiry">
            <option>General enquiry</option>
            <option>Question about a report</option>
            <option>Payments &amp; refunds</option>
            <option>Business &amp; trade accounts</option>
            <option>Data correction request</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="cf-reg">Vehicle registration (optional)</label>
          <input id="cf-reg" name="registration" maxLength={10} className="uppercase" autoComplete="off" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="cf-message">Message *</label>
        <textarea id="cf-message" name="message" rows={6} aria-invalid={Boolean(errors.message)} />
        {errors.message && <span className="field-error">{errors.message}</span>}
      </div>
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="cf-company">Company</label>
        <input id="cf-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      {status === 'error' && errorText && (
        <p className="notice notice-error" role="alert">
          {errorText}
        </p>
      )}
      <p className="form-privacy">
        By sending this form you agree to us using your details to respond to your enquiry, as described in our{' '}
        <a href="/privacy-policy">Privacy Policy</a>.
      </p>
      <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
        {status === 'sending' ? <Loader2 size={18} className="spin" /> : <Send size={18} />}
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
