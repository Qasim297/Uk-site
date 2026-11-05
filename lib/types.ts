// Shared, client-safe types for vehicle reports.

export type DefectType =
  | 'ADVISORY'
  | 'MINOR'
  | 'MAJOR'
  | 'DANGEROUS'
  | 'FAIL'
  | 'PRS'
  | 'USER ENTERED'
  | string;

export interface MotDefect {
  text: string;
  type: DefectType;
  dangerous: boolean;
}

export interface MotTest {
  completedDate: string;
  result: 'PASSED' | 'FAILED' | string;
  expiryDate?: string;
  odometerValue?: number;
  odometerUnit?: 'MI' | 'KM' | string;
  odometerResultType?: string;
  testNumber?: string;
  defects: MotDefect[];
}

export interface MileageReading {
  date: string;
  miles: number;
}

export type UlezStatus =
  | 'compliant'
  | 'non-compliant'
  | 'likely-compliant'
  | 'likely-non-compliant'
  | 'unknown';

export interface UlezResult {
  status: UlezStatus;
  basis: 'euro-status' | 'registration-date' | 'fuel-type' | 'unknown';
  summary: string;
}

export type DataSource = 'dvsa' | 'dvla' | 'demo' | 'unavailable' | 'not-configured';

export interface VehicleReport {
  registration: string;
  isDemo: boolean;
  generatedAt: string;
  sources: { mot: DataSource; tax: DataSource };
  vehicle: {
    make?: string;
    model?: string;
    colour?: string;
    fuelType?: string;
    engineSize?: string;
    firstUsedDate?: string;
    registrationDate?: string;
    yearOfManufacture?: number;
    co2Emissions?: number;
    euroStatus?: string;
    markedForExport?: boolean;
  };
  mot: {
    status: 'valid' | 'expired' | 'not-due' | 'no-record' | 'unknown';
    expiryDate?: string;
    dueDate?: string;
    totalTests: number;
    passes: number;
    fails: number;
    tests: MotTest[];
  };
  tax: {
    status?: string;
    dueDate?: string;
  } | null;
  ulez: UlezResult;
  mileage: {
    readings: MileageReading[];
    latest?: MileageReading;
    averagePerYear?: number;
    anomalies: string[];
  };
  warnings: string[];
}
