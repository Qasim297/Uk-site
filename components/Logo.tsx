export default function Logo({ size = 40 }: { size?: number }) {
  return (
    <span className="logo">
      <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" className="logo-mark">
        <defs>
          <linearGradient id="acp-shield" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#5fb0ff" />
            <stop offset="1" stopColor="#1a56ff" />
          </linearGradient>
        </defs>
        <path d="M24 2.5 42.5 8.8V23c0 11.4-7.7 19.2-18.5 22.6C13.2 42.2 5.5 34.4 5.5 23V8.8Z" fill="url(#acp-shield)" />
        <path d="M24 7.4 38 12.1V23c0 8.8-5.8 15-14 18-8.2-3-14-9.2-14-18V12.1Z" fill="#071027" opacity=".28" />
        <path d="M14.2 28.5a10 10 0 0 1 19.6 0" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="2.4" strokeLinecap="round" />
        <path d="m16.8 25.6 5 5L32 19.4" fill="none" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="logo-text">
        AutoCheck<span className="logo-accent">Pro</span>
      </span>
    </span>
  );
}
