import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'مولّد رموز الاستجابة السريعة الاحترافي';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f172a',
          color: '#ffffff',
          fontFamily: 'sans-serif',
          position: 'relative',
          padding: '60px 80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              maxWidth: '650px',
              textAlign: 'right',
              direction: 'rtl',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#84cc16',
                color: '#0f172a',
                padding: '8px 20px',
                borderRadius: '9999px',
                fontSize: '18px',
                fontWeight: 900,
                marginBottom: '24px',
              }}
            >
              ✨ مجاني 100% وبدون إعلانات
            </div>

            <h1
              style={{
                fontSize: '50px',
                fontWeight: 900,
                color: '#ffffff',
                margin: 0,
                marginBottom: '16px',
              }}
            >
              مولّد رموز الاستجابة السريعة
            </h1>

            <p
              style={{
                fontSize: '22px',
                color: '#94a3b8',
                lineHeight: 1.5,
              }}
            >
              أنشئ وخصّص رموز QR احترافية لروابط المواقع، شبكات Wi-Fi، وبطاقات الأعمال بدقة فائقة مجاناً.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#ffffff',
              padding: '24px',
              borderRadius: '32px',
              border: '6px solid #84cc16',
            }}
          >
            <svg width="220" height="220" viewBox="0 0 100 100" fill="none">
              <rect x="5" y="5" width="28" height="28" rx="6" fill="#0f172a" />
              <rect x="11" y="11" width="16" height="16" rx="3" fill="#ffffff" />
              <rect x="15" y="15" width="8" height="8" rx="2" fill="#84cc16" />
              <rect x="67" y="5" width="28" height="28" rx="6" fill="#0f172a" />
              <rect x="73" y="11" width="16" height="16" rx="3" fill="#ffffff" />
              <rect x="77" y="15" width="8" height="8" rx="2" fill="#84cc16" />
              <rect x="5" y="67" width="28" height="28" rx="6" fill="#0f172a" />
              <rect x="11" y="73" width="16" height="16" rx="3" fill="#ffffff" />
              <rect x="15" y="77" width="8" height="8" rx="2" fill="#84cc16" />
              <rect x="38" y="38" width="24" height="24" rx="5" fill="#84cc16" />
              <circle cx="50" cy="50" r="6" fill="#0f172a" />
            </svg>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
