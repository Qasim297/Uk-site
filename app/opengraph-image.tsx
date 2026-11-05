import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'AutoCheck Pro - Know Your Car Before You Buy';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #050b1c 0%, #0b1a3d 60%, #123a8f 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 40, fontWeight: 800, marginBottom: 40 }}>
          AutoCheck<span style={{ color: '#4da3ff' }}>Pro</span>
        </div>
        <div style={{ display: 'flex', fontSize: 76, fontWeight: 800, lineHeight: 1.1 }}>Know Your Car Before You Buy</div>
        <div style={{ display: 'flex', fontSize: 32, marginTop: 28, color: '#b8c7e6' }}>
          UK MOT history, mileage, tax &amp; ULEZ checks
        </div>
      </div>
    ),
    size,
  );
}
