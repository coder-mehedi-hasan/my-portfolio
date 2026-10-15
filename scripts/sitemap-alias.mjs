import { copyFile } from 'node:fs/promises';
import path from 'node:path';

// `@astrojs/sitemap` always writes `sitemap-index.xml`, but the previous Next.js
// site published `/sitemap.xml` and Search Console already knows that URL. Copy
// the generated index to the legacy filename so the old URL keeps working.
const dist = path.resolve(process.cwd(), 'dist');
const indexFile = path.join(dist, 'sitemap-index.xml');
const aliasFile = path.join(dist, 'sitemap.xml');

await copyFile(indexFile, aliasFile);
console.log('Wrote dist/sitemap.xml (alias of dist/sitemap-index.xml)');
