import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 50%, #2563EB 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 800, color: 'white', letterSpacing: '-2px' }}>
          Smooqi
        </div>
        <div style={{ fontSize: 32, color: 'rgba(255,255,255,0.85)', marginTop: 20, textAlign: 'center', maxWidth: 800 }}>
          One lesson a day. 195+ topics. Build real knowledge.
        </div>
        <div style={{
          marginTop: 40,
          padding: '12px 32px',
          background: 'white',
          borderRadius: 50,
          fontSize: 22,
          fontWeight: 700,
          color: '#7C3AED',
        }}>
          Start Free — No Credit Card
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
