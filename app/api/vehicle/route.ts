import { NextRequest, NextResponse } from 'next/server';
import { isValidReg, normaliseReg } from '@/lib/registration';
import { clientIp, rateLimit } from '@/lib/rateLimit';
import { getVehicleReport, UpstreamError, VehicleNotFoundError } from '@/lib/server/vehicleService';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const noStore = { 'Cache-Control': 'no-store' };

export async function GET(req: NextRequest) {
  if (!rateLimit(`vehicle:${clientIp(req)}`, 15, 60_000)) {
    return NextResponse.json(
      { error: 'Too many searches. Please wait a minute and try again.' },
      { status: 429, headers: noStore },
    );
  }

  const reg = normaliseReg(req.nextUrl.searchParams.get('reg') || '');
  if (!isValidReg(reg)) {
    return NextResponse.json(
      { error: 'Please enter a valid UK vehicle registration number.' },
      { status: 400, headers: noStore },
    );
  }

  try {
    const report = await getVehicleReport(reg);
    return NextResponse.json(report, { headers: noStore });
  } catch (err) {
    if (err instanceof VehicleNotFoundError) {
      return NextResponse.json(
        { error: 'We could not find a vehicle with that registration. Please check it and try again.' },
        { status: 404, headers: noStore },
      );
    }
    if (err instanceof UpstreamError) {
      return NextResponse.json(
        { error: 'Vehicle data services are temporarily unavailable. Please try again shortly.' },
        { status: 503, headers: noStore },
      );
    }
    console.error('[api/vehicle] unexpected error', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500, headers: noStore });
  }
}
