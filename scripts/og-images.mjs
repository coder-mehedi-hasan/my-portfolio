import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { listEntries } from '../lib/content/store.mjs';

/**
 * Derive 1200×630 Open Graph cards from an entry's own image. The card is a
 * stable `/public` URL, so it can be referenced from frontmatter as
 * `social_image` without depending on a build hash. Run with `npm run seo:og`.
 *
 * Sources are cropped to cover; if the subject matters more than the frame,
 * author a purpose-made card instead and point `social_image` at it.
 */
const WIDTH = 1200;
const HEIGHT = 630;
const publicDir = path.join(process.cwd(), 'public');
const assetsDir = path.join(process.cwd(), 'src', 'assets');
const outDir = path.join(publicDir, 'og');

/** Resolve a frontmatter image path to a real file under /public or src/assets. */
function sourceFile(value) {
  for (const root of [publicDir, assetsDir]) {
    const file = path.join(root, value);
    if (fs.existsSync(file)) return file;
  }
  return null;
}

/** Entries whose image is a local path we can read and transform. */
function plans() {
  const local = (value) => typeof value === 'string' && value.startsWith('/') && !value.startsWith('//');
  return [
    ...listEntries('projects').map((entry) => ({ type: 'projects', entry, source: entry.image })),
    // The default blog portrait would produce the same card for every article,
    // so only convert articles that ship their own feature image.
    ...listEntries('blogs')
      .filter((entry) => entry.feature_image && entry.feature_image !== '/me.jpg')
      .map((entry) => ({ type: 'blogs', entry, source: entry.feature_image })),
  ].filter(({ source }) => local(source) && sourceFile(source));
}

fs.mkdirSync(outDir, { recursive: true });

const written = [];
const skipped = [];
for (const { type, entry, source } of plans()) {
  const input = sourceFile(source);
  const output = path.join(outDir, `${type === 'blogs' ? 'blog-' : 'project-'}${entry.slug}.jpg`);
  const { width = 0, height = 0 } = await sharp(input).metadata();
  // Never upscale meaningfully: a card scaled past 1.25× just looks soft. Author
  // a dedicated 1200×630 image instead and point `social_image` at it.
  const scale = Math.max(WIDTH / width, HEIGHT / height);
  if (scale > 1.25) {
    skipped.push(`${path.relative(process.cwd(), input)} (${width}×${height})`);
    continue;
  }
  await sharp(input)
    .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'attention' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(output);
  written.push(path.relative(process.cwd(), output));
}

if (written.length === 0) {
  console.log('No local entry images to convert. Nothing written.');
} else {
  console.log(`Wrote ${written.length} social card(s):`);
  for (const file of written) console.log(`  ${file}`);
}
for (const note of skipped) console.log(`Skipped ${note}. Author a card for it if it needs one.`);
