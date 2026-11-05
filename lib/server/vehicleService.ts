// SERVER-ONLY: builds a normalised VehicleReport from DVSA + DVLA data,
// or from clearly-labelled demo data when no credentials are configured.

import type { DataSource, MileageReading, MotTest, VehicleReport } from '@/lib/types';
import { assessUlez } from '@/lib/ulez';
import { fetchMotHistory, isDvsaConfigured, type DvsaVehicle } from './dvsa';
import { fetchVesVehicle, isDvlaConfigured, type DvlaVehicle } from './dvla';
import { buildDemoSources } from './demo';

export class VehicleNotFoundError extends Error {}
export class UpstreamError extends Error {}

const KM_TO_MILES = 0.621371;

export async function getVehicleReport(registration: string): Promise<VehicleReport> {
  const dvsaOn = isDvsaConfigured();
  const dvlaOn = isDvlaConfigured();

  // No credentials at all -> DEMO DATA, always labelled as such.
  if (!dvsaOn && !dvlaOn) {
    const demo = buildDemoSources(registration);
    return buildReport({
      registration,
      dvsa: demo.dvsa,
      dvla: demo.dvla,
      sources: { mot: 'demo', tax: 'demo' },
      isDemo: true,
      warnings: [],
    });
  }

  const warnings: string[] = [];
  const [motRes, vesRes] = await Promise.allSettled([
    dvsaOn ? fetchMotHistory(registration) : Promise.resolve(undefined),
    dvlaOn ? fetchVesVehicle(registration) : Promise.resolve(undefined),
  ]);

  let dvsa: DvsaVehicle | null | undefined;
  let motSource: DataSource = dvsaOn ? 'dvsa' : 'not-configured';
  if (motRes.status === 'fulfilled') dvsa = motRes.value;
  else {
    console.error('[vehicle] DVSA error:', motRes.reason);
    motSource = 'unavailable';
    warnings.push('The MOT history service is temporarily unavailable. Please try again shortly.');
  }

  let dvla: DvlaVehicle | null | undefined;
  let taxSource: DataSource = dvlaOn ? 'dvla' : 'not-configured';
  if (vesRes.status === 'fulfilled') dvla = vesRes.value;
  else {
    console.error('[vehicle] DVLA error:', vesRes.reason);
    taxSource = 'unavailable';
    warnings.push('The vehicle tax service is temporarily unavailable. Please try again shortly.');
  }

  if (motSource === 'unavailable' && (taxSource === 'unavailable' || taxSource === 'not-configured')) {
    throw new UpstreamError('Vehicle data services are unavailable');
  }
  if (!dvsa && !dvla && motSource !== 'unavailable' && taxSource !== 'unavailable') {
    throw new VehicleNotFoundError('Vehicle not found');
  }

  return buildReport({
    registration,
    dvsa,
    dvla,
    sources: { mot: motSource, tax: taxSource },
    isDemo: false,
    warnings,
  });
}

interface BuildInput {
  registration: string;
  dvsa: DvsaVehicle | null | undefined;
  dvla: DvlaVehicle | null | undefined;
  sources: VehicleReport['sources'];
  isDemo: boolean;
  warnings: string[];
}

function toIsoDate(value?: string): string | undefined {
  if (!value) return undefined;
  // DVLA month format "2015-09" -> first of month
  if (/^\d{4}-\d{2}$/.test(value)) return `${value}-01`;
  return value;
}

function buildReport({ registration, dvsa, dvla, sources, isDemo, warnings }: BuildInput): VehicleReport {
  const tests: MotTest[] = (dvsa?.motTests || [])
    .map((t) => ({
      completedDate: t.completedDate,
      result: t.testResult,
      expiryDate: t.expiryDate,
      odometerValue: t.odometerValue ? Number(t.odometerValue) : undefined,
      odometerUnit: t.odometerUnit,
      odometerResultType: t.odometerResultType,
      testNumber: t.motTestNumber,
      defects: (t.defects || []).map((d) => ({ text: d.text, type: d.type, dangerous: Boolean(d.dangerous) })),
    }))
    .sort((a, b) => new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime());

  const passes = tests.filter((t) => t.result === 'PASSED').length;
  const fails = tests.filter((t) => t.result === 'FAILED').length;

  // MOT status
  const latestPass = tests.find((t) => t.result === 'PASSED' && t.expiryDate);
  let motStatus: VehicleReport['mot']['status'] = 'unknown';
  const expiryDate = latestPass?.expiryDate || dvla?.motExpiryDate;
  if (expiryDate) {
    motStatus = new Date(expiryDate) >= startOfToday() ? 'valid' : 'expired';
  } else if (dvsa?.motTestDueDate) {
    motStatus = 'not-due';
  } else if (dvla?.motStatus) {
    const s = dvla.motStatus.toLowerCase();
    motStatus = s === 'valid' ? 'valid' : s === 'not valid' ? 'expired' : 'no-record';
  } else if (dvsa && tests.length === 0) {
    motStatus = 'no-record';
  }

  // Mileage
  const readings: MileageReading[] = tests
    .filter((t) => t.odometerValue !== undefined && (t.odometerResultType ?? 'READ') === 'READ')
    .map((t) => ({
      date: t.completedDate,
      miles: Math.round((t.odometerValue as number) * (t.odometerUnit?.toUpperCase() === 'KM' ? KM_TO_MILES : 1)),
    }))
    .reverse(); // oldest first

  const anomalies: string[] = [];
  let maxSoFar = 0;
  for (const r of readings) {
    if (r.miles < maxSoFar) {
      anomalies.push(
        `Recorded mileage dropped to ${r.miles.toLocaleString('en-GB')} miles on ${new Date(r.date).toLocaleDateString('en-GB')} after a previous reading of ${maxSoFar.toLocaleString('en-GB')} miles.`,
      );
    }
    maxSoFar = Math.max(maxSoFar, r.miles);
  }

  const latest = readings[readings.length - 1];
  const first = readings[0];
  let averagePerYear: number | undefined;
  if (latest && first && latest !== first) {
    const years = (new Date(latest.date).getTime() - new Date(first.date).getTime()) / (365.25 * 86_400_000);
    if (years > 0.5) averagePerYear = Math.round((latest.miles - first.miles) / years);
  }

  const firstRegistered = dvsa?.firstUsedDate || dvsa?.registrationDate || toIsoDate(dvla?.monthOfFirstRegistration);
  const fuelType = dvsa?.fuelType || dvla?.fuelType;

  return {
    registration,
    isDemo,
    generatedAt: new Date().toISOString(),
    sources,
    vehicle: {
      make: dvsa?.make || dvla?.make,
      model: dvsa?.model,
      colour: dvsa?.primaryColour || dvla?.colour,
      fuelType,
      engineSize: dvsa?.engineSize || (dvla?.engineCapacity ? String(dvla.engineCapacity) : undefined),
      firstUsedDate: firstRegistered,
      registrationDate: dvsa?.registrationDate,
      yearOfManufacture: dvla?.yearOfManufacture || (dvsa?.manufactureDate ? new Date(dvsa.manufactureDate).getFullYear() : undefined),
      co2Emissions: dvla?.co2Emissions,
      euroStatus: dvla?.euroStatus,
      markedForExport: dvla?.markedForExport,
    },
    mot: {
      status: motStatus,
      expiryDate,
      dueDate: dvsa?.motTestDueDate,
      totalTests: tests.length,
      passes,
      fails,
      tests,
    },
    tax: dvla ? { status: dvla.taxStatus, dueDate: dvla.taxDueDate } : null,
    ulez: assessUlez({ fuelType, euroStatus: dvla?.euroStatus, firstRegistered }),
    mileage: { readings, latest, averagePerYear, anomalies },
    warnings,
  };
}

function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}
