// UK registration helpers (client and server safe).

/** Uppercase and strip spaces/punctuation: "ab12 cde" -> "AB12CDE". */
export function normaliseReg(input: string): string {
  return (input || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
}

/**
 * Light validation covering current, prefix, suffix, dateless and NI formats.
 * Every UK plate contains at least one letter and one digit, max 7–8 characters.
 */
export function isValidReg(reg: string): boolean {
  return /^[A-Z0-9]{2,8}$/.test(reg) && /[A-Z]/.test(reg) && /[0-9]/.test(reg);
}

/** Pretty-print for display: "AB12CDE" -> "AB12 CDE". */
export function formatReg(reg: string): string {
  const r = normaliseReg(reg);
  if (/^[A-Z]{2}[0-9]{2}[A-Z]{3}$/.test(r)) return `${r.slice(0, 4)} ${r.slice(4)}`;
  if (/^[A-Z][0-9]{1,3}[A-Z]{3}$/.test(r)) return `${r.slice(0, r.length - 3)} ${r.slice(-3)}`;
  if (/^[A-Z]{3}[0-9]{1,3}[A-Z]$/.test(r)) return `${r.slice(0, 3)} ${r.slice(3)}`;
  if (/^[A-Z]{3}[0-9]{1,4}$/.test(r)) return `${r.slice(0, 3)} ${r.slice(3)}`;
  return r;
}
