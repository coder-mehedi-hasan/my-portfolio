import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { audit } from '../scripts/seo-audit.mjs';
import { currentRoutes } from '../scripts/route-inventory.mjs';

const repository = path.resolve(fileURLToPath(new URL('../', import.meta.url)));
const distRoot = path.join(repository, 'dist');
const inventoryFile = path.join(repository, 'tests', 'route-inventory.json');

// These checks read the built site, so they only run once `dist/` exists.
// `npm run build` produces it; the plain content tests do not.
const skip = fs.existsSync(distRoot) ? false : 'run `npm run build` first';

test('built site passes the SEO audit', { skip }, () => {
  const { pages, errors } = audit();
  assert.deepEqual(errors, [], `\n${errors.join('\n')}`);
  assert.ok(pages.length > 0, 'the build should contain pages');
});

test('every route still exists, so the migration did not drop a URL', { skip }, () => {
  const { routes } = JSON.parse(fs.readFileSync(inventoryFile, 'utf8'));
  const current = new Set(currentRoutes());
  const expected = new Set(routes);
  const missing = routes.filter((route) => !current.has(route));
  const added = currentRoutes().filter((route) => !expected.has(route));
  assert.deepEqual(missing, [], `routes removed since the verified inventory:\n${missing.join('\n')}`);
  assert.deepEqual(added, [], `routes added since the verified inventory — run \`npm run seo:inventory\` if intentional:\n${added.join('\n')}`);
});
