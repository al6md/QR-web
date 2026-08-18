import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-cairo',
});

export const metadata: Metadata = {
  title: 'مولّد رموز الاستجابة السريعة الاحترافي | QR Code Generator',
  description: 'منصة احترافية وسريعة لتوليد وتصميم رموز QR عالية الدقة مجاناً بالكامل. تخصيص الألوان، التدرجات، الشعارات، وتصدير بجودات تصل إلى 4K.',
  verification: {
    google: 'N-2y_Klcge7a2tlkTLIO8eJsqwFnDecrN5yvh1M3Moc',
  },
  other: {
    'google-site-verification': 'N-2y_Klcge7a2tlkTLIO8eJsqwFnDecrN5yvh1M3Moc',
  },
  openGraph: {
    title: 'مولّد رموز الاستجابة السريعة الاحترافي',
    description: 'أنشئ وخصّص رموز QR احترافية بروابط وواي فاي وبطاقات عمل وشعارات مخصصة.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`scroll-smooth ${cairo.variable}`}>
      <head>
        <meta name="google-site-verification" content="N-2y_Klcge7a2tlkTLIO8eJsqwFnDecrN5yvh1M3Moc" />
      </head>
      <body className="min-h-screen bg-white text-[#171717] antialiased font-['Cairo',sans-serif] selection:bg-[#84cc16] selection:text-[#171717]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}


