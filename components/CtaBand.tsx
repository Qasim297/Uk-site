import RegSearch from './RegSearch';
import Reveal from './Reveal';

export default function CtaBand({
  title = 'Ready to check your next car?',
  text = 'Enter a UK registration and get MOT history, mileage, tax and ULEZ information in seconds.',
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="cta-band">
          <div className="cta-band-glow" aria-hidden="true" />
          <h2>{title}</h2>
          <p>{text}</p>
          <RegSearch size="md" />
        </Reveal>
      </div>
    </section>
  );
}
