export function formatDate(value?: string): string {
  if (!value) return '—';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function formatNumber(value?: number): string {
  if (value === undefined || value === null || Number.isNaN(value)) return '—';
  return Math.round(value).toLocaleString('en-GB');
}

export function titleCase(value?: string): string {
  if (!value) return '—';
  return value
    .toLowerCase()
    .split(/\s+/)
    .map((w) => (w.length <= 3 && /\d/.test(w) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(' ');
}

export function daysUntil(value?: string): number | null {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((d.getTime() - today.getTime()) / 86_400_000);
}
