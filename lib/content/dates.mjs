import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { contentRoot, listEntries } from './store.mjs';
import { contentTypes } from './schema.mjs';

/** The list page each content type feeds. */
const LIST_ROUTES = {
  blogs: '/blogs',
  projects: '/projects',
  skills: '/skills',
  experiences: '/experience',
};

/** Static pages that are not backed by a content entry. */
const STATIC_PAGES = {
  '/': 'src/pages/index.astro',
  '/about': 'src/pages/about.astro',
  '/contact': 'src/pages/contact.astro',
  '/testimonials': 'src/pages/testimonials.astro',
};

/**
 * The date a file last changed, preferring its last git commit so a date is
 * derived from the content rather than from a fresh build or checkout.
 * @param {string} file absolute path
 * @returns {number} epoch milliseconds, or 0 when unknown
 */
function fileDate(file) {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', file], {
      cwd: process.cwd(),
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (out) return Date.parse(out) || 0;
  } catch {
    // No git (or no history for the file): fall back to the filesystem.
  }
  try {
    return fs.statSync(file).mtimeMs;
  } catch {
    return 0;
  }
}

/**
 * Content-based `lastmod` values per public path. Detail pages use their
 * `modified_date`/`date`, or the file's last change when the entry has no date
 * field. List pages use the newest entry they show, and the homepage uses the
 * newest page anywhere on the site.
 * @param {string} [root]
 * @returns {Record<string, string>} pathname -> ISO date
 */
export function contentLastmod(root = contentRoot) {
  /** @type {Record<string, string>} */
  const lastmod = {};

  const record = (url, time) => {
    if (!time) return;
    const iso = new Date(time).toISOString();
    if (!lastmod[url] || Date.parse(lastmod[url]) < time) lastmod[url] = iso;
  };

  for (const type of contentTypes) {
    for (const entry of listEntries(type, { root })) {
      const declared = entry.modified_date || entry.date;
      const file = path.join(root, type, `${entry.slug}.md`);
      const time = declared
        ? Date.parse(`${declared}T00:00:00Z`)
        : fileDate(file);
      record(`/${type}/${entry.slug}`, time);
      record(LIST_ROUTES[type], time);
      record('/', time);
    }
  }

  for (const [url, relative] of Object.entries(STATIC_PAGES)) {
    record(url, fileDate(path.join(process.cwd(), relative)));
  }

  return lastmod;
}
