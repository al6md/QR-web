import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svgLogo = `
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="112" fill="#0f172a" />
  <rect x="16" y="16" width="480" height="480" rx="96" stroke="#84cc16" stroke-width="24" />

  <!-- Corner 1 (Top Left) -->
  <rect x="64" y="64" width="130" height="130" rx="32" fill="#ffffff" />
  <rect x="90" y="90" width="78" height="78" rx="16" fill="#0f172a" />
  <rect x="110" y="110" width="38" height="38" rx="8" fill="#84cc16" />

  <!-- Corner 2 (Top Right) -->
  <rect x="318" y="64" width="130" height="130" rx="32" fill="#ffffff" />
  <rect x="344" y="90" width="78" height="78" rx="16" fill="#0f172a" />
  <rect x="364" y="110" width="38" height="38" rx="8" fill="#84cc16" />

  <!-- Corner 3 (Bottom Left) -->
  <rect x="64" y="318" width="130" height="130" rx="32" fill="#ffffff" />
  <rect x="90" y="344" width="78" height="78" rx="16" fill="#0f172a" />
  <rect x="110" y="364" width="38" height="38" rx="8" fill="#84cc16" />

  <!-- Center Badge -->
  <rect x="206" y="206" width="100" height="100" rx="24" fill="#84cc16" />
  <circle cx="256" cy="256" r="24" fill="#0f172a" />

  <!-- Decorative Pattern Dots -->
  <circle cx="256" cy="100" r="16" fill="#ffffff" />
  <circle cx="256" cy="150" r="16" fill="#ffffff" />
  <circle cx="100" cy="256" r="16" fill="#ffffff" />
  <circle cx="150" cy="256" r="16" fill="#ffffff" />

  <circle cx="362" cy="256" r="16" fill="#ffffff" />
  <circle cx="412" cy="256" r="16" fill="#ffffff" />
  <circle cx="256" cy="362" r="16" fill="#ffffff" />
  <circle cx="256" cy="412" r="16" fill="#ffffff" />

  <circle cx="340" cy="340" r="20" fill="#84cc16" />
  <circle cx="390" cy="340" r="20" fill="#84cc16" />
  <circle cx="340" cy="390" r="20" fill="#84cc16" />
  <circle cx="390" cy="390" r="20" fill="#84cc16" />
</svg>
`;

const ogSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0f172a" />
  <circle cx="100" cy="100" r="250" fill="#6366f1" opacity="0.15" />
  <circle cx="1100" cy="500" r="250" fill="#84cc16" opacity="0.15" />
  <rect x="40" y="40" width="1120" height="550" rx="32" stroke="#1e293b" stroke-width="4" />

  <!-- QR Icon Card on Left -->
  <g transform="translate(100, 115)">
    <rect width="400" height="400" rx="40" fill="#ffffff" stroke="#84cc16" stroke-width="12" />
    <g transform="translate(50, 50)">
      <!-- Corner 1 -->
      <rect x="0" y="0" width="90" height="90" rx="20" fill="#0f172a" />
      <rect x="18" y="18" width="54" height="54" rx="10" fill="#ffffff" />
      <rect x="32" y="32" width="26" height="26" rx="6" fill="#84cc16" />

      <!-- Corner 2 -->
      <rect x="210" y="0" width="90" height="90" rx="20" fill="#0f172a" />
      <rect x="228" y="18" width="54" height="54" rx="10" fill="#ffffff" />
      <rect x="242" y="32" width="26" height="26" rx="6" fill="#84cc16" />

      <!-- Corner 3 -->
      <rect x="0" y="210" width="90" height="90" rx="20" fill="#0f172a" />
      <rect x="18" y="228" width="54" height="54" rx="10" fill="#ffffff" />
      <rect x="32" y="242" width="26" height="26" rx="6" fill="#84cc16" />

      <!-- Center -->
      <rect x="115" y="115" width="70" height="70" rx="16" fill="#84cc16" />
      <circle cx="150" cy="150" r="16" fill="#0f172a" />

      <!-- Dots -->
      <circle cx="150" cy="45" r="12" fill="#0f172a" />
      <circle cx="45" cy="150" r="12" fill="#0f172a" />
      <circle cx="255" cy="150" r="12" fill="#0f172a" />
      <circle cx="150" cy="255" r="12" fill="#0f172a" />
      <circle cx="230" cy="230" r="14" fill="#84cc16" />
      <circle cx="270" cy="230" r="14" fill="#84cc16" />
      <circle cx="230" cy="270" r="14" fill="#84cc16" />
      <circle cx="270" cy="270" r="14" fill="#84cc16" />
    </g>
  </g>

  <!-- Content on Right -->
  <g transform="translate(560, 160)">
    <rect width="230" height="42" rx="21" fill="#84cc16" />
    <text x="115" y="27" fill="#0f172a" font-size="20" font-weight="900" text-anchor="middle" font-family="sans-serif">QR Code Generator</text>
    
    <text x="0" y="110" fill="#ffffff" font-size="44" font-weight="900" font-family="sans-serif">مولّد رموز الاستجابة السريعة</text>
    <text x="0" y="170" fill="#94a3b8" font-size="24" font-weight="600" font-family="sans-serif">تصميم وتخصيص رموز QR عالية الدقة مجاناً</text>
    <text x="0" y="210" fill="#94a3b8" font-size="20" font-weight="500" font-family="sans-serif">روابط · واي فاي · بطاقات أعمال · تصدير 4K</text>

    <text x="0" y="290" fill="#84cc16" font-size="20" font-weight="700" font-family="sans-serif">🌐 qr-web-ten-beta.vercel.app</text>
  </g>
</svg>
`;

async function generate() {
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const svgBuffer = Buffer.from(svgLogo);

  // 1. 512x512 Icon
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'icon.png'));
  console.log('✓ public/icon.png (512x512)');

  // 2. 192x192 Icon
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'icon-192.png'));
  console.log('✓ public/icon-192.png (192x192)');

  // 3. 48x48 (Google's official favicon crawler standard: multiple of 48px)
  await sharp(svgBuffer)
    .resize(48, 48)
    .png()
    .toFile(path.join(publicDir, 'favicon-48x48.png'));
  console.log('✓ public/favicon-48x48.png (48x48)');

  // 4. 32x32 Favicon
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'));
  console.log('✓ public/favicon-32x32.png (32x32)');

  // 5. favicon.ico (write PNG buffer as favicon.ico)
  const png48 = await sharp(svgBuffer).resize(48, 48).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), png48);
  console.log('✓ public/favicon.ico');

  // 6. Apple Touch Icon 180x180
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ public/apple-touch-icon.png (180x180)');

  // 7. OG Image 1200x630
  await sharp(Buffer.from(ogSvg))
    .resize(1200, 630)
    .png()
    .toFile(path.join(publicDir, 'og-image.png'));
  console.log('✓ public/og-image.png (1200x630)');

  // 8. site.webmanifest
  const manifest = {
    name: 'مولّد رموز الاستجابة السريعة الاحترافي',
    short_name: 'QR Generator',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    theme_color: '#0f172a',
    background_color: '#0f172a',
    display: 'standalone',
  };
  fs.writeFileSync(
    path.join(publicDir, 'site.webmanifest'),
    JSON.stringify(manifest, null, 2)
  );
  console.log('✓ public/site.webmanifest');
}

generate().catch(console.error);
