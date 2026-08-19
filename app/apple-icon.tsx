import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0f172a',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '36px',
          border: '6px solid #84cc16',
          padding: '16px',
        }}
      >
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
          <rect x="5" y="5" width="30" height="30" rx="8" fill="#ffffff" />
          <rect x="11" y="11" width="18" height="18" rx="4" fill="#0f172a" />
          <rect x="15" y="15" width="10" height="10" rx="2" fill="#84cc16" />

          <rect x="65" y="5" width="30" height="30" rx="8" fill="#ffffff" />
          <rect x="71" y="11" width="18" height="18" rx="4" fill="#0f172a" />
          <rect x="75" y="15" width="10" height="10" rx="2" fill="#84cc16" />

          <rect x="5" y="65" width="30" height="30" rx="8" fill="#ffffff" />
          <rect x="11" y="71" width="18" height="18" rx="4" fill="#0f172a" />
          <rect x="15" y="75" width="10" height="10" rx="2" fill="#84cc16" />

          <rect x="38" y="38" width="24" height="24" rx="6" fill="#84cc16" />
          <circle cx="50" cy="50" r="6" fill="#0f172a" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
