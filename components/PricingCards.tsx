'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CircleCheck, Loader2, Lock } from 'lucide-react';
import { formatPrice, plans, type Plan } from '@/lib/pricing';
import { isValidReg, normaliseReg } from '@/lib/registration';

export default function PricingCards({ showRegInput = false }: { showRegInput?: boolean }) {
  const router = useRouter();
  const [reg, setReg] = useState('');
  const [loading, setLoading] = useState<Plan['id'] | null>(null);
  const [message, setMessage] = useState<{ type: 'error' | 'info'; text: string } | null>(null);

  async function choose(plan: Plan) {
    setMessage(null);
    if (plan.price === 0) {
      router.push('/#vehicle-search');
      return;
    }
    const registration = normaliseReg(reg);
    if (plan.id === 'premium') {
      if (!showRegInput) {
        router.push('/pricing#checkout');
        return;
      }
      if (!isValidReg(registration)) {
        setMessage({ type: 'error', text: 'Enter the registration of the vehicle you want a Premium Report for.' });
        document.getElementById('checkout-reg')?.focus();
        return;
      }
    }

    setLoading(plan.id);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: plan.id, registration }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      setMessage({ type: res.status === 503 ? 'info' : 'error', text: data.error || 'Payment could not be started.' });
    } catch {
      setMessage({ type: 'error', text: 'Network error. Please check your connection and try again.' });
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="pricing" id="checkout">
      {showRegInput && (
        <div className="checkout-reg">
          <label htmlFor="checkout-reg">Vehicle registration for your Premium Report</label>
          <div className="plate plate-sm">
            <span className="plate-band" aria-hidden="true">
              UK
            </span>
            <input
              id="checkout-reg"
              className="plate-input"
              value={reg}
              maxLength={10}
              placeholder="ENTER REG"
              autoComplete="off"
              spellCheck={false}
              onChange={(e) => setReg(e.target.value.toUpperCase())}
            />
          </div>
        </div>
      )}

      {message && (
        <p className={`notice notice-${message.type}`} role="status">
          {message.text}
        </p>
      )}

      <div className="pricing-grid">
        {plans.map((plan) => (
          <article key={plan.id} className={`pricing-card${plan.highlighted ? ' featured' : ''}`}>
            {plan.badge && <span className="pricing-badge">{plan.badge}</span>}
            <h3>{plan.name}</h3>
            <p className="pricing-desc">{plan.description}</p>
            <p className="pricing-price">
              <span className="amount">{formatPrice(plan.price)}</span>
              {plan.price > 0 && <span className="per">inc. VAT</span>}
            </p>
            <p className="pricing-note">{plan.priceNote}</p>
            <ul className="pricing-features">
              {plan.features.map((f) => (
                <li key={f}>
                  <CircleCheck size={18} aria-hidden="true" /> {f}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className={`btn btn-block ${plan.highlighted ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => choose(plan)}
              disabled={loading !== null}
            >
              {loading === plan.id ? <Loader2 size={18} className="spin" /> : plan.price > 0 ? <Lock size={16} /> : null}
              {plan.cta}
            </button>
          </article>
        ))}
      </div>
      <p className="pricing-footnote">
        <Lock size={14} /> Payments are processed securely by our payment provider. We never see or store your card
        details. Premium data (finance, write-off, stolen and keeper checks) is supplied by licensed third-party data
        providers.
      </p>
    </div>
  );
}
