import { ChevronDown } from 'lucide-react';

export interface FaqItem {
  q: string;
  a: string;
}

export default function FAQ({ items, withSchema = true }: { items: FaqItem[]; withSchema?: boolean }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };

  return (
    <div className="faq">
      {items.map((item, i) => (
        <details key={item.q} className="faq-item" open={i === 0}>
          <summary>
            <span>{item.q}</span>
            <ChevronDown size={20} className="faq-chev" aria-hidden="true" />
          </summary>
          <div className="faq-answer">
            <p>{item.a}</p>
          </div>
        </details>
      ))}
      {withSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      )}
    </div>
  );
}
