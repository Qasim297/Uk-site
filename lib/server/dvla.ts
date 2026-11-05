// SERVER-ONLY: DVLA Vehicle Enquiry Service (VES) client.
// Docs: https://developer-portal.driver-vehicle-licensing.api.gov.uk/

export interface DvlaVehicle {
  registrationNumber: string;
  taxStatus?: string;
  taxDueDate?: string;
  motStatus?: string;
  motExpiryDate?: string;
  make?: string;
  yearOfManufacture?: number;
  engineCapacity?: number;
  co2Emissions?: number;
  fuelType?: string;
  markedForExport?: boolean;
  colour?: string;
  monthOfFirstRegistration?: string;
  euroStatus?: string;
}

export function isDvlaConfigured(): boolean {
  return Boolean(process.env.DVLA_VES_API_KEY);
}

/** Returns the vehicle, or null when DVLA holds no record for the registration. */
export async function fetchVesVehicle(registration: string): Promise<DvlaVehicle | null> {
  const url =
    process.env.DVLA_VES_API_URL ||
    'https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles';

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'x-api-key': process.env.DVLA_VES_API_KEY as string,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ registrationNumber: registration }),
    cache: 'no-store',
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`DVLA VES request failed with status ${res.status}`);

  return (await res.json()) as DvlaVehicle;
}
