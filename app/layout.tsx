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
  metadataBase: new URL('https://qr-web-ten-beta.vercel.app'),
  title: {
    default: 'مولّد رموز الاستجابة السريعة الاحترافي | QR Code Generator',
    template: '%s | مولّد رموز QR',
  },
  description: 'منصة مجانية احترافية لتوليد وتصميم رموز QR عالية الدقة (روابط، واي فاي، بطاقات عمل vCard، شعارات، وألوان مخصصة) وتصديرها بدقة 4K مجاناً.',
  applicationName: 'مولّد رموز QR الاحترافي',
  authors: [{ name: 'QR Generator Online' }],
  generator: 'Next.js',
  keywords: [
    'مولد رمز qr',
    'توليد باركود',
    'تصميم رمز qr',
    'باركود واي فاي',
    'بطاقة عمل qr',
    'qr code generator',
    'qr generator arabic',
    'صانع الباركود المجاني',
    'إنشاء رمز استجابة سريعة',
  ],
  creator: 'QR Web',
  publisher: 'QR Web',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://qr-web-ten-beta.vercel.app/',
  },
  verification: {
    google: 'N-2y_Klcge7a2tlkTLIO8eJsqwFnDecrN5yvh1M3Moc',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: 'https://qr-web-ten-beta.vercel.app/',
    siteName: 'مولّد رموز الاستجابة السريعة الاحترافي',
    title: 'مولّد رموز الاستجابة السريعة الاحترافي | QR Code Generator',
    description: 'أنشئ وخصّص رموز QR احترافية بروابط وواي فاي وبطاقات عمل وشعارات مخصصة بجودة 4K مجاناً.',
    images: [
      {
        url: 'https://qr-web-ten-beta.vercel.app/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'مولّد رموز الاستجابة السريعة الاحترافي',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'مولّد رموز الاستجابة السريعة الاحترافي | QR Code Generator',
    description: 'أنشئ وخصّص رموز QR احترافية بروابط وواي فاي وبطاقات عمل وشعارات مخصصة بجودة 4K مجاناً.',
    images: ['https://qr-web-ten-beta.vercel.app/twitter-image'],
  },
  icons: {
    icon: [
      { url: '/icon', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  },
  other: {
    'google-site-verification': 'N-2y_Klcge7a2tlkTLIO8eJsqwFnDecrN5yvh1M3Moc',
    'thumbnail': 'https://qr-web-ten-beta.vercel.app/opengraph-image',
    'image': 'https://qr-web-ten-beta.vercel.app/opengraph-image',
  },
};

const jsonLdStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://qr-web-ten-beta.vercel.app/#website',
      'url': 'https://qr-web-ten-beta.vercel.app/',
      'name': 'مولّد رموز الاستجابة السريعة الاحترافي',
      'alternateName': ['QR Code Generator', 'مولد QR', 'صانع باركود QR'],
      'description': 'منصة مجانية احترافية لتوليد وتصميم رموز QR عالية الدقة مجاناً.',
      'inLanguage': 'ar',
      'image': 'https://qr-web-ten-beta.vercel.app/opengraph-image',
    },
    {
      '@type': 'WebApplication',
      '@id': 'https://qr-web-ten-beta.vercel.app/#webapp',
      'url': 'https://qr-web-ten-beta.vercel.app/',
      'name': 'مولّد رموز الاستجابة السريعة الاحترافي',
      'applicationCategory': 'UtilitiesApplication',
      'operatingSystem': 'All',
      'browserRequirements': 'Requires JavaScript. Requires HTML5.',
      'description': 'أداة مجانية لتوليد رموز الاستجابة السريعة QR للروابط والواي فاي وبطاقات الأعمال مع إمكانية تخصيص الألوان والشعارات بدقة 4K.',
      'image': 'https://qr-web-ten-beta.vercel.app/opengraph-image',
      'screenshot': 'https://qr-web-ten-beta.vercel.app/opengraph-image',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD',
      },
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.9',
        'ratingCount': '1240',
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`scroll-smooth ${cairo.variable}`}>
      <head>
        <meta name="google-site-verification" content="N-2y_Klcge7a2tlkTLIO8eJsqwFnDecrN5yvh1M3Moc" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdStructuredData) }}
        />
      </head>
      <body className="min-h-screen bg-white text-[#171717] antialiased font-['Cairo',sans-serif] selection:bg-[#84cc16] selection:text-[#171717]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}


