import sharp from 'sharp';
await sharp('assets/arkive-global-mark.png')
  .resize({ width: 116 })
  .webp({ quality: 88 })
  .toFile('public/assets/mark.webp');
for (const lang of ['en', 'ko']) {
  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#102738"/><path d="M780 0v630M0 500h1200" stroke="#425968"/><path d="m845 195 130-75 130 75-130 75-130-75Zm0 75 130 75 130-75m-260 75 130 75 130-75" fill="none" stroke="#b8cbd5" stroke-width="2"/><text x="75" y="170" font-family="Arial,sans-serif" font-size="24" letter-spacing="4" fill="#c4d2d9">ARKIVE GLOBAL</text><text x="75" y="280" font-family="Georgia,serif" font-size="62" fill="#ffffff">Intellectual property.</text><text x="75" y="360" font-family="Georgia,serif" font-style="italic" font-size="62" fill="#b8ccd6">Global possibility.</text><text x="75" y="560" font-family="Arial,sans-serif" font-size="18" letter-spacing="2" fill="#c4d2d9">TECHNOLOGY IP HOLDING &amp; LICENSING · ${lang.toUpperCase()}</text></svg>`;
  await sharp(Buffer.from(svg))
    .png()
    .toFile(`public/assets/social-${lang}.png`);
}
