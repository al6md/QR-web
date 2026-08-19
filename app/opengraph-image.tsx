import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'مولّد رموز الاستجابة السريعة الاحترافي | QR Code Generator';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
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
          backgroundImage: 'radial-gradient(circle at 25px 25px, #1e293b 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1e293b 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          color: '#ffffff',
          fontFamily: 'sans-serif',
          position: 'relative',
          padding: '60px 80px',
        }}
      >
        {/* Glow decoration */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: '#84cc16',
            filter: 'blur(140px)',
            opacity: 0.25,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            left: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: '#6366f1',
            filter: 'blur(140px)',
            opacity: 0.25,
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            zIndex: 10,
          }}
        >
          {/* Right text in RTL */}
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
                boxShadow: '0 4px 12px rgba(132, 204, 22, 0.4)',
              }}
            >
              ✨ مجاني 100% وبدون إعلانات
            </div>

            <h1
              style={{
                fontSize: '52px',
                fontWeight: 900,
                lineHeight: 1.15,
                color: '#ffffff',
                marginBottom: '16px',
                margin: 0,
              }}
            >
              مولّد رموز الاستجابة السريعة
            </h1>

            <p
              style={{
                fontSize: '22px',
                color: '#94a3b8',
                lineHeight: 1.5,
                marginTop: '16px',
                marginBottom: '28px',
              }}
            >
              أنشئ وخصّص رموز QR احترافية عالية الدقة لروابط المواقع، شبكات Wi-Fi، بطاقات الأعمال الرقمية وشعارات مخصصة مجاناً.
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '16px',
                color: '#84cc16',
                fontWeight: 700,
              }}
            >
              <span>🌐 qr-web-ten-beta.vercel.app</span>
              <span>·</span>
              <span>دقة فائقة تصل إلى 4K</span>
            </div>
          </div>

          {/* Left QR Code Visual Box */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#ffffff',
              padding: '24px',
              borderRadius: '32px',
              border: '6px solid #84cc16',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
              transform: 'rotate(-2deg)',
            }}
          >
            {/* Custom SVG QR representation */}
            <svg
              width="240"
              height="240"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Corner 1 */}
              <rect x="5" y="5" width="28" height="28" rx="6" fill="#0f172a" />
              <rect x="11" y="11" width="16" height="16" rx="3" fill="#ffffff" />
              <rect x="15" y="15" width="8" height="8" rx="2" fill="#84cc16" />

              {/* Corner 2 */}
              <rect x="67" y="5" width="28" height="28" rx="6" fill="#0f172a" />
              <rect x="73" y="11" width="16" height="16" rx="3" fill="#ffffff" />
              <rect x="77" y="15" width="8" height="8" rx="2" fill="#84cc16" />

              {/* Corner 3 */}
              <rect x="5" y="67" width="28" height="28" rx="6" fill="#0f172a" />
              <rect x="11" y="73" width="16" height="16" rx="3" fill="#ffffff" />
              <rect x="15" y="77" width="8" height="8" rx="2" fill="#84cc16" />

              {/* QR Pattern Dots */}
              <circle cx="42" cy="12" r="3" fill="#0f172a" />
              <circle cx="52" cy="12" r="3" fill="#0f172a" />
              <circle cx="42" cy="22" r="3" fill="#0f172a" />
              <circle cx="58" cy="22" r="3" fill="#0f172a" />
              <circle cx="12" cy="42" r="3" fill="#0f172a" />
              <circle cx="22" cy="42" r="3" fill="#0f172a" />
              <circle cx="12" cy="52" r="3" fill="#0f172a" />
              <circle cx="22" cy="58" r="3" fill="#0f172a" />

              <rect x="38" y="38" width="24" height="24" rx="5" fill="#84cc16" />
              <circle cx="50" cy="50" r="6" fill="#0f172a" />

              <circle cx="72" cy="42" r="3" fill="#0f172a" />
              <circle cx="82" cy="42" r="3" fill="#0f172a" />
              <circle cx="72" cy="54" r="3" fill="#0f172a" />
              <circle cx="88" cy="54" r="3" fill="#0f172a" />

              <circle cx="42" cy="72" r="3" fill="#0f172a" />
              <circle cx="54" cy="72" r="3" fill="#0f172a" />
              <circle cx="42" cy="84" r="3" fill="#0f172a" />
              <circle cx="54" cy="84" r="3" fill="#0f172a" />
              <circle cx="72" cy="72" r="3" fill="#0f172a" />
              <circle cx="84" cy="72" r="3" fill="#0f172a" />
              <circle cx="72" cy="84" r="3" fill="#0f172a" />
              <circle cx="84" cy="84" r="3" fill="#0f172a" />
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
