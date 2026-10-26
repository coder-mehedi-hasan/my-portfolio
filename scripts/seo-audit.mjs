import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Static audit of the built site. It reads `dist/` (never the source) so the
 * checks see exactly what a crawler would: titles, descriptions, canonicals,
 * robots directives, headings, JSON-LD, images, internal links, and the
 * sitemap. Run after `npm run build` with `npm run seo:audit`.
 */

const repository = path.resolve(fileURLToPath(new URL('../', import.meta.url)));
const distRoot = path.join(repository, 'dist');
const SITE = 'https://mehedihasan.dev';

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", apos: "'" };
const decode = (value) => value.replace(/&(#\d+|[a-z]+);/gi, (match, code) => ENTITIES[code.toLowerCase()] ?? match);

function match(html, pattern) {
  return [...html.matchAll(pattern)];
}

/** Every `.html` file in dist, keyed by its public pathname. */
export function collectPages(root = distRoot) {
  const pages = new Map();
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile() && entry.name.endsWith('.html')) {
        const rel = path.relative(root, full).split(path.sep).join('/');
        const pathname = rel === 'index.html' ? '/' : `/${rel.replace(/\.html$/, '').replace(/\/index$/, '')}`;
        pages.set(pathname, fs.readFileSync(full, 'utf8'));
      }
    }
  };
  walk(root);
  return pages;
}

/** The `dist` file a public URL would be served from, or `null`. */
export function fileForUrl(url) {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(url, SITE).pathname);
  } catch {
    return null;
  }
  const rel = pathname.replace(/^\/+/, '');
  const candidates = pathname === '/'
    ? ['index.html']
    : [path.join(rel, 'index.html'), `${rel}.html`, rel];
  for (const candidate of candidates) {
    const full = path.join(distRoot, candidate);
    if (fs.existsSync(full) && fs.statSync(full).isFile()) return full;
  }
  return null;
}

function attributes(tag) {
  const attrs = {};
  for (const [, name, value] of tag.matchAll(/\s([a-zA-Z][\w-]*)="([^"]*)"/g)) attrs[name.toLowerCase()] = decode(value);
  return attrs;
}

function jsonLdBlocks(html) {
  return match(html, /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g).map((m) => m[1]);
}

function internalLinks(html) {
  const links = new Set();
  for (const [tag] of match(html, /<a\b[^>]*>/gi)) {
    const href = attributes(tag).href;
    if (!href || href.startsWith('#') || /^(mailto:|tel:|javascript:)/i.test(href)) continue;
    try {
      if (new URL(href, SITE).origin !== SITE) continue;
      links.add(decodeURIComponent(new URL(href, SITE).pathname.replace(/\/+$/, '') || '/'));
    } catch {
      // A malformed href is its own problem; report it as a broken link below.
      links.add(href);
    }
  }
  return links;
}

export function audit(root = distRoot) {
  const pages = collectPages(root);
  const errors = [];
  const warnings = [];
  const titles = new Map();
  const descriptions = new Map();

  for (const [pathname, html] of pages) {
    const where = pathname;

    const titleTags = match(html, /<title[^>]*>([\s\S]*?)<\/title>/g);
    if (titleTags.length !== 1) errors.push(`${where}: expected exactly one <title>, found ${titleTags.length}`);
    const title = titleTags[0] ? decode(titleTags[0][1].trim()) : '';
    if (!title) errors.push(`${where}: <title> is empty`);

    const descTags = match(html, /<meta\b[^>]*\bname="description"[^>]*>/gi).map((m) => attributes(m[0]));
    if (descTags.length !== 1) errors.push(`${where}: expected exactly one meta description, found ${descTags.length}`);
    const description = descTags[0]?.content ?? '';
    if (!description) errors.push(`${where}: meta description is empty`);

    const canonicalTags = match(html, /<link\b[^>]*\brel="canonical"[^>]*>/gi).map((m) => attributes(m[0]));
    if (canonicalTags.length !== 1) errors.push(`${where}: expected exactly one canonical, found ${canonicalTags.length}`);
    const canonical = canonicalTags[0]?.href ?? '';
    if (canonical && !canonical.startsWith('https://')) errors.push(`${where}: canonical is not absolute (${canonical})`);

    const robotsMeta = match(html, /<meta\b[^>]*\bname="robots"[^>]*>/gi).map((m) => attributes(m[0]).content).join(' ');
    const indexable = robotsMeta !== '' && !/noindex/i.test(robotsMeta);
    if (robotsMeta === '') errors.push(`${where}: no robots meta tag`);

    const h1Count = match(html, /<h1\b/gi).length;
    if (h1Count !== 1) errors.push(`${where}: expected exactly one <h1>, found ${h1Count}`);

    for (const block of jsonLdBlocks(html)) {
      try {
        const data = JSON.parse(block);
        if (JSON.stringify(data).includes('/undefined')) {
          errors.push(`${where}: JSON-LD contains an invalid /undefined URL`);
        }
      } catch (error) {
        errors.push(`${where}: JSON-LD does not parse (${error.message})`);
      }
    }

    for (const [tag] of match(html, /<img\b[^>]*>/gi)) {
      const attrs = attributes(tag);
      if (!('alt' in attrs)) errors.push(`${where}: <img src="${attrs.src ?? ''}"> has no alt attribute`);
      if (!attrs.width || !attrs.height) errors.push(`${where}: <img src="${attrs.src ?? ''}"> is missing width/height`);
      if (attrs.src && attrs.src.startsWith('/') && !/^\/\//.test(attrs.src) && !fileForUrl(attrs.src)) {
        errors.push(`${where}: <img src="${attrs.src}"> does not exist in dist`);
      }
    }

    if (indexable) {
      if (title.length > 60) warnings.push(`${where}: title is ${title.length} characters — keep the distinct text within ~60 for SERP display`);
      if (titles.has(title)) errors.push(`${where}: duplicate title with ${titles.get(title)} — "${title}"`);
      else titles.set(title, where);
      if (descriptions.has(description)) errors.push(`${where}: duplicate description with ${descriptions.get(description)}`);
      else descriptions.set(description, where);
    }
  }

  // Broken internal links: every local href must resolve to a built file.
  for (const [pathname, html] of pages) {
    for (const href of internalLinks(html)) {
      if (!fileForUrl(href)) errors.push(`${pathname}: broken internal link → ${href}`);
    }
  }

  // Sitemap: only canonical, indexable, existing URLs, each with a lastmod.
  const sitemapFile = path.join(root, 'sitemap-0.xml');
  const sitemapUrls = fs.existsSync(sitemapFile)
    ? [...fs.readFileSync(sitemapFile, 'utf8').matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({
        loc: m[1].match(/<loc>([^<]*)<\/loc>/)?.[1] ?? '',
        lastmod: m[1].match(/<lastmod>([^<]*)<\/lastmod>/)?.[1] ?? '',
      }))
    : [];
  if (!sitemapUrls.length) errors.push('sitemap-0.xml is missing or empty');

  const inSitemap = new Set();
  for (const { loc, lastmod } of sitemapUrls) {
    const pathname = decodeURIComponent(new URL(loc, SITE).pathname.replace(/\/+$/, '') || '/');
    inSitemap.add(pathname);
    if (/\/raw\/|_template/i.test(loc)) errors.push(`sitemap: must not contain ${loc}`);
    if (!fileForUrl(loc)) errors.push(`sitemap: ${loc} has no built page`);
    if (!lastmod) errors.push(`sitemap: ${loc} has no lastmod`);
    const html = pages.get(pathname);
    if (!html) continue;
    const canonical = match(html, /<link\b[^>]*\brel="canonical"[^>]*>/gi).map((m) => attributes(m[0]).href)[0];
    const robots = match(html, /<meta\b[^>]*\bname="robots"[^>]*>/gi).map((m) => attributes(m[0]).content).join(' ');
    if (canonical && canonical.replace(/\/$/, '') !== loc.replace(/\/$/, '')) errors.push(`sitemap: ${loc} canonical points to ${canonical}`);
    if (/noindex/i.test(robots)) errors.push(`sitemap: ${loc} is noindex`);
  }

  // Orphan check: reach every sitemap page from the homepage by following links.
  const seen = new Set(['/']);
  const queue = ['/'];
  while (queue.length) {
    const current = queue.shift();
    for (const href of internalLinks(pages.get(current) ?? '')) {
      if (seen.has(href)) continue;
      seen.add(href);
      if (pages.has(href)) queue.push(href);
    }
  }
  for (const pathname of inSitemap) {
    if (pathname !== '/' && !seen.has(pathname)) errors.push(`orphan: ${pathname} is in the sitemap but unreachable from the homepage`);
  }

  // Internal linking: count distinct pages that link to each sitemap page.
  const inbound = new Map();
  for (const [from, html] of pages) {
    for (const href of internalLinks(html)) {
      if (href === from) continue;
      if (!inbound.has(href)) inbound.set(href, new Set());
      inbound.get(href).add(from);
    }
  }
  for (const pathname of inSitemap) {
    if (pathname === '/') continue;
    const count = inbound.get(pathname)?.size ?? 0;
    if (count < 3) warnings.push(`${pathname}: only ${count} inbound internal link(s) — aim for at least three`);
  }

  return { pages: [...pages.keys()].sort(), errors, warnings };
}

function main() {
  if (!fs.existsSync(distRoot)) {
    console.error('dist/ not found. Run `npm run build` first.');
    process.exitCode = 1;
    return;
  }
  const { pages, errors, warnings } = audit();
  for (const warning of warnings) console.warn(`warning: ${warning}`);
  if (errors.length) {
    console.error(`SEO audit failed with ${errors.length} issue(s) across ${pages.length} pages:\n`);
    for (const error of errors) console.error(`  - ${error}`);
    process.exitCode = 1;
    return;
  }
  console.log(`SEO audit passed: ${pages.length} pages, unique metadata, canonicals, links, images, and sitemap all valid.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
