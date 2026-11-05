import type { UlezResult } from './types';

interface UlezInput {
  fuelType?: string;
  euroStatus?: string;
  firstRegistered?: string;
}

/**
 * Estimates London ULEZ compliance using TfL's published standards:
 * petrol = Euro 4 or better, diesel = Euro 6 or better, zero-emission vehicles are exempt.
 * This is guidance only - users are always told to confirm with TfL.
 */
export function assessUlez({ fuelType, euroStatus, firstRegistered }: UlezInput): UlezResult {
  const fuel = (fuelType || '').toLowerCase();

  if (fuel === 'electric' || fuel === 'electricity' || fuel === 'hydrogen') {
    return { status: 'compliant', basis: 'fuel-type', summary: 'Zero-emission vehicles meet ULEZ standards.' };
  }

  const isDiesel = fuel.includes('diesel');
  const isPetrol = fuel.includes('petrol') || (fuel.includes('hybrid') && !isDiesel);
  const required = isDiesel ? 6 : isPetrol ? 4 : null;

  if (required === null) {
    return { status: 'unknown', basis: 'unknown', summary: 'Fuel type unknown, so ULEZ compliance could not be estimated.' };
  }

  const euroMatch = (euroStatus || '').match(/(\d)/);
  if (euroMatch) {
    const euro = Number(euroMatch[1]);
    return euro >= required
      ? { status: 'compliant', basis: 'euro-status', summary: `Euro ${euro} ${isDiesel ? 'diesel' : 'petrol'} meets the Euro ${required} ULEZ standard.` }
      : { status: 'non-compliant', basis: 'euro-status', summary: `Euro ${euro} is below the Euro ${required} ULEZ standard for ${isDiesel ? 'diesel' : 'petrol'} vehicles.` };
  }

  if (firstRegistered) {
    const reg = new Date(firstRegistered);
    if (!Number.isNaN(reg.getTime())) {
      const threshold = isDiesel ? new Date('2015-09-01') : new Date('2006-01-01');
      const label = isDiesel ? 'September 2015' : 'January 2006';
      return reg >= threshold
        ? { status: 'likely-compliant', basis: 'registration-date', summary: `${isDiesel ? 'Diesel' : 'Petrol'} vehicles first registered from ${label} usually meet ULEZ standards.` }
        : { status: 'likely-non-compliant', basis: 'registration-date', summary: `${isDiesel ? 'Diesel' : 'Petrol'} vehicles registered before ${label} often do not meet ULEZ standards.` };
    }
  }

  return { status: 'unknown', basis: 'unknown', summary: 'Not enough information to estimate ULEZ compliance.' };
}
