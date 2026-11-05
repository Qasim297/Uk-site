// SERVER-ONLY: DVSA MOT History API client.
// Docs: https://documentation.history.mot.api.gov.uk/
// Credentials are read from environment variables and never sent to the browser.

export interface DvsaDefect {
  text: string;
  type: string;
  dangerous?: boolean;
}

export interface DvsaMotTest {
  completedDate: string;
  testResult: string;
  expiryDate?: string;
  odometerValue?: string;
  odometerUnit?: string;
  odometerResultType?: string;
  motTestNumber?: string;
  defects?: DvsaDefect[];
}

export interface DvsaVehicle {
  registration: string;
  make?: string;
  model?: string;
  firstUsedDate?: string;
  fuelType?: string;
  primaryColour?: string;
  registrationDate?: string;
  manufactureDate?: string;
  engineSize?: string;
  motTestDueDate?: string;
  motTests?: DvsaMotTest[];
}

let tokenCache: { token: string; expiresAt: number } | null = null;

export function isDvsaConfigured(): boolean {
  return Boolean(
    process.env.DVSA_CLIENT_ID &&
      process.env.DVSA_CLIENT_SECRET &&
      process.env.DVSA_API_KEY &&
      process.env.DVSA_TOKEN_URL,
  );
}

async function getAccessToken(): Promise<string> {
  if (tokenCache && tokenCache.expiresAt > Date.now() + 60_000) return tokenCache.token;

  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: process.env.DVSA_CLIENT_ID as string,
    client_secret: process.env.DVSA_CLIENT_SECRET as string,
    scope: process.env.DVSA_SCOPE || 'https://tapi.dvsa.gov.uk/.default',
  });

  const res = await fetch(process.env.DVSA_TOKEN_URL as string, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
    cache: 'no-store',
  });

  if (!res.ok) throw new Error(`DVSA token request failed with status ${res.status}`);

  const json = (await res.json()) as { access_token: string; expires_in?: number };
  tokenCache = {
    token: json.access_token,
    expiresAt: Date.now() + (json.expires_in ?? 3600) * 1000,
  };
  return json.access_token;
}

/** Returns the vehicle, or null when DVSA holds no record for the registration. */
export async function fetchMotHistory(registration: string): Promise<DvsaVehicle | null> {
  const token = await getAccessToken();
  const base = process.env.DVSA_API_BASE_URL || 'https://history.mot.api.gov.uk';

  const res = await fetch(`${base}/v1/trade/vehicles/registration/${encodeURIComponent(registration)}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-API-Key': process.env.DVSA_API_KEY as string,
      Accept: 'application/json',
    },
    cache: 'no-store',
  });

  if (res.status === 404) return null;
  if (res.status === 401 || res.status === 403) tokenCache = null;
  if (!res.ok) throw new Error(`DVSA MOT History request failed with status ${res.status}`);

  return (await res.json()) as DvsaVehicle;
}
