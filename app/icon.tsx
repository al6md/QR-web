import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = {
  width: 512,
  height: 512,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: '#0f172a',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '96px',
          border: '16px solid #84cc16',
          padding: '40px',
        }}
      >
        <svg
          width="360"
          height="360"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Corner 1 */}
          <rect x="5" y="5" width="30" height="30" rx="8" fill="#ffffff" />
          <rect x="11" y="11" width="18" height="18" rx="4" fill="#0f172a" />
          <rect x="15" y="15" width="10" height="10" rx="2" fill="#84cc16" />

          {/* Corner 2 */}
          <rect x="65" y="5" width="30" height="30" rx="8" fill="#ffffff" />
          <rect x="71" y="11" width="18" height="18" rx="4" fill="#0f172a" />
          <rect x="75" y="15" width="10" height="10" rx="2" fill="#84cc16" />

          {/* Corner 3 */}
          <rect x="5" y="65" width="30" height="30" rx="8" fill="#ffffff" />
          <rect x="11" y="71" width="18" height="18" rx="4" fill="#0f172a" />
          <rect x="15" y="75" width="10" height="10" rx="2" fill="#84cc16" />

          {/* Center Brand Badge */}
          <rect x="38" y="38" width="24" height="24" rx="6" fill="#84cc16" />
          <circle cx="50" cy="50" r="6" fill="#0f172a" />

          {/* Dots */}
          <circle cx="45" cy="15" r="4" fill="#ffffff" />
          <circle cx="55" cy="15" r="4" fill="#ffffff" />
          <circle cx="45" cy="25" r="4" fill="#ffffff" />
          <circle cx="55" cy="25" r="4" fill="#ffffff" />

          <circle cx="15" cy="45" r="4" fill="#ffffff" />
          <circle cx="25" cy="45" r="4" fill="#ffffff" />
          <circle cx="15" cy="55" r="4" fill="#ffffff" />
          <circle cx="25" cy="55" r="4" fill="#ffffff" />

          <circle cx="75" cy="45" r="4" fill="#ffffff" />
          <circle cx="85" cy="45" r="4" fill="#ffffff" />
          <circle cx="75" cy="55" r="4" fill="#ffffff" />
          <circle cx="85" cy="55" r="4" fill="#ffffff" />

          <circle cx="45" cy="75" r="4" fill="#ffffff" />
          <circle cx="55" cy="75" r="4" fill="#ffffff" />
          <circle cx="45" cy="85" r="4" fill="#ffffff" />
          <circle cx="55" cy="85" r="4" fill="#ffffff" />

          <circle cx="75" cy="75" r="4" fill="#84cc16" />
          <circle cx="85" cy="75" r="4" fill="#84cc16" />
          <circle cx="75" cy="85" r="4" fill="#84cc16" />
          <circle cx="85" cy="85" r="4" fill="#84cc16" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
