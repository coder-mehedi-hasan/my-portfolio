import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

/**
 * The portrait lives in `public/` so social cards keep a stable, unhashed URL,
 * which also means it skips Astro's `<Image />` pipeline. That left the
 * 1599×1599 source being downloaded for both places the site renders it: the
 * 64 px hero avatar and the 300 px about column. Emit fixed-width WebP variants
 * next to the source so the markup can pick one with `srcset`/`sizes`.
 *
 * Both slots render the portrait with `filter: grayscale(1)`, so the variants
 * are encoded in grayscale: the same pixels on screen without the chroma
 * payload the CSS discards. The untouched original stays for `og:image`.
 *
 * Run with `npm run images` after replacing the source photo.
 */
const SOURCE = path.join('public', 'md-mehedi-hasan-portfolio.jpg');
/** 128/192 cover the 64 px avatar at 2×/3×; 300/600/900 the 300 px about column. */
const WIDTHS = [128, 192, 300, 600, 900];
const OUT_DIR = path.join('public', 'portrait');

fs.mkdirSync(OUT_DIR, { recursive: true });

const written = [];
for (const width of WIDTHS) {
  const output = path.join(OUT_DIR, `mehedi-${width}.webp`);
  const { height, size } = await sharp(SOURCE)
    .resize({ width, withoutEnlargement: true })
    .grayscale()
    .webp({ quality: 80, effort: 5 })
    .toFile(output);
  written.push(`${output} — ${width}×${height}, ${Math.round(size / 1024)} KB`);
}

console.log(`Wrote ${written.length} responsive variants from ${SOURCE}:`);
for (const line of written) console.log(`  ${line}`);
