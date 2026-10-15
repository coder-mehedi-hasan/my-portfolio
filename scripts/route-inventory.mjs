import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { collectPages } from './seo-audit.mjs';

/**
 * The public HTML routes in the current build. `404.html` is excluded because it
 * is deliberately not a crawlable route.
 */
export function currentRoutes() {
  return [...collectPages().keys()].filter((route) => route !== '/404').sort();
}

const OUT = path.join(process.cwd(), 'tests', 'route-inventory.json');

function main() {
  const routes = currentRoutes();
  const inventory = {
    site: 'https://mehedihasan.dev',
    note: 'Public routes verified against the pre-migration Next.js inventory when the Astro migration landed. Refresh with `npm run seo:inventory` only when a page is added or removed on purpose; the route-parity test treats any other change as a regression.',
    routes,
  };
  fs.writeFileSync(OUT, `${JSON.stringify(inventory, null, 2)}\n`);
  console.log(`Wrote ${routes.length} routes to ${path.relative(process.cwd(), OUT)}.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
