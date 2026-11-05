// SERVER-ONLY: DEMO DATA generator.
// Used ONLY when no API credentials are configured. Every report built from this
// data is flagged `isDemo: true` and rendered with prominent "DEMO DATA" labels.
// None of this data relates to the registration entered.

import type { DvsaMotTest, DvsaVehicle } from './dvsa';
import type { DvlaVehicle } from './dvla';

interface DemoProfile {
  make: string;
  model: string;
  colour: string;
  fuel: string;
  engine: string;
  ageYears: number;
  euro: string;
  co2: number;
}

const PROFILES: DemoProfile[] = [
  { make: 'FORD', model: 'FOCUS', colour: 'Blue', fuel: 'Petrol', engine: '999', ageYears: 8, euro: 'EURO 6', co2: 108 },
  { make: 'VOLKSWAGEN', model: 'GOLF', colour: 'Grey', fuel: 'Diesel', engine: '1968', ageYears: 10, euro: 'EURO 5', co2: 119 },
  { make: 'TOYOTA', model: 'YARIS', colour: 'White', fuel: 'Hybrid Electric', engine: '1490', ageYears: 5, euro: 'EURO 6', co2: 92 },
  { make: 'BMW', model: '3 SERIES', colour: 'Black', fuel: 'Diesel', engine: '1995', ageYears: 7, euro: 'EURO 6', co2: 124 },
];

const ADVISORIES = [
  'Nearside front tyre worn close to legal limit (5.2.3 (e))',
  'Offside rear brake disc worn, pitted or scored, but not seriously weakened (1.1.14 (a) (ii))',
  'Front suspension arm pin or bush has slight play (5.3.4 (a) (i))',
  'Oil leak, but not excessive (8.4.1 (a) (i))',
  'Windscreen has damage to an area less than a 40mm circle outside zone A (3.2 (a) (i))',
];

function hash(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) >>> 0;
  return h;
}

function iso(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function addYears(d: Date, years: number, days = 0): Date {
  const n = new Date(d);
  n.setFullYear(n.getFullYear() + years);
  n.setDate(n.getDate() + days);
  return n;
}

export function buildDemoSources(registration: string): { dvsa: DvsaVehicle; dvla: DvlaVehicle } {
  const seed = hash(registration);
  const p = PROFILES[seed % PROFILES.length];
  const now = new Date();
  const firstUsed = new Date(now.getFullYear() - p.ageYears, seed % 12, 1 + (seed % 27));

  const tests: DvsaMotTest[] = [];
  let miles = 0;
  for (let year = 3; year <= p.ageYears; year++) {
    const testDate = addYears(firstUsed, year, -12);
    if (testDate > now) break;
    miles += year === 3 ? 21000 + (seed % 7000) : 6500 + ((seed >>> year) % 4000);

    if (year === 5) {
      tests.push({
        completedDate: `${iso(testDate)}T10:15:00.000Z`,
        testResult: 'FAILED',
        odometerValue: String(miles),
        odometerUnit: 'MI',
        odometerResultType: 'READ',
        motTestNumber: `DEMO${String(seed).slice(0, 4)}${year}01`,
        defects: [
          { text: 'Nearside headlamp aim too high (4.1.2 (a))', type: 'MAJOR', dangerous: false },
          { text: 'Offside front tyre tread depth below requirements of 1.6mm (5.2.3 (e))', type: 'MAJOR', dangerous: false },
          { text: ADVISORIES[(seed + year) % ADVISORIES.length], type: 'ADVISORY', dangerous: false },
        ],
      });
      const retest = new Date(testDate);
      retest.setDate(retest.getDate() + 2);
      tests.push({
        completedDate: `${iso(retest)}T14:40:00.000Z`,
        testResult: 'PASSED',
        expiryDate: iso(addYears(firstUsed, year + 1, -1)),
        odometerValue: String(miles + 14),
        odometerUnit: 'MI',
        odometerResultType: 'READ',
        motTestNumber: `DEMO${String(seed).slice(0, 4)}${year}02`,
        defects: [],
      });
      continue;
    }

    const advisoryCount = (seed + year) % 3;
    tests.push({
      completedDate: `${iso(testDate)}T09:30:00.000Z`,
      testResult: 'PASSED',
      expiryDate: iso(addYears(firstUsed, year + 1, -1)),
      odometerValue: String(miles),
      odometerUnit: 'MI',
      odometerResultType: 'READ',
      motTestNumber: `DEMO${String(seed).slice(0, 4)}${year}00`,
      defects: Array.from({ length: advisoryCount }, (_, i) => ({
        text: ADVISORIES[(seed + year + i) % ADVISORIES.length],
        type: 'ADVISORY',
        dangerous: false,
      })),
    });
  }

  const taxDue = addYears(firstUsed, p.ageYears + 1);
  taxDue.setDate(1);

  return {
    dvsa: {
      registration,
      make: p.make,
      model: p.model,
      firstUsedDate: iso(firstUsed),
      registrationDate: iso(firstUsed),
      fuelType: p.fuel,
      primaryColour: p.colour,
      engineSize: p.engine,
      motTests: tests,
      motTestDueDate: tests.length === 0 ? iso(addYears(firstUsed, 3)) : undefined,
    },
    dvla: {
      registrationNumber: registration,
      taxStatus: 'Taxed',
      taxDueDate: iso(taxDue),
      make: p.make,
      yearOfManufacture: firstUsed.getFullYear(),
      engineCapacity: Number(p.engine),
      co2Emissions: p.co2,
      fuelType: p.fuel.toUpperCase(),
      colour: p.colour.toUpperCase(),
      monthOfFirstRegistration: iso(firstUsed).slice(0, 7),
      euroStatus: p.euro,
      markedForExport: false,
    },
  };
}
