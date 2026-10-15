import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { getSchema, slugSchema, contentTypes } from './schema.mjs';

/**
 * Content lives inside the Astro pages tree so each Markdown file is a routed
 * page. Drafts are parked behind a leading underscore, which Astro never routes,
 * so a draft can never be served or indexed. `CONTENT_ROOT` lets the generator
 * and tests point at a scratch tree.
 */
export const contentRoot = process.env.CONTENT_ROOT
  ? path.resolve(process.env.CONTENT_ROOT)
  : path.join(process.cwd(), 'src', 'pages');

/** Astro ignores any page whose filename starts with this character. */
const DRAFT_PREFIX = '_';
/** The one underscore file that is content, not a draft: the authoring starter. */
const TEMPLATE_FILE = '_template.md';

/**
 * Astro owns `layout` on a Markdown page. It is required in the file but is not
 * part of the content schema, so drop it before validating frontmatter.
 * @param {Record<string, any>} data
 * @returns {Record<string, any>}
 */
function stripAstroKeys(data) {
  if (!Object.hasOwn(data, 'layout')) return data;
  const { layout, ...rest } = data;
  return rest;
}

/**
 * @param {string} type
 * @param {string} slug
 * @param {string} [root]
 * @param {{ draft?: boolean }} [options]
 * @returns {string}
 */
export function contentPath(type, slug, root = contentRoot, { draft = false } = {}) {
  getSchema(type);
  slugSchema.parse(slug);
  return path.join(root, type, `${draft ? DRAFT_PREFIX : ''}${slug}.md`);
}

/**
 * The file that actually exists for a slug, whether published or a draft, or
 * `null` when neither is on disk.
 * @param {string} type
 * @param {string} slug
 * @param {string} [root]
 * @returns {string | null}
 */
function resolvePath(type, slug, root = contentRoot) {
  for (const draft of [false, true]) {
    const file = contentPath(type, slug, root, { draft });
    if (fs.existsSync(file)) return file;
  }
  return null;
}

/**
 * Report every problem in one pass so a form can show them all at once.
 * Keys are field names (or "body"); values read like "start_date: Use YYYY-MM-DD".
 * @param {string} type
 * @param {Record<string, unknown>} data
 * @param {string} [body]
 * @returns {Record<string, string>}
 */
export function entryIssues(type, data, body = '') {
  const issues = {};
  const content = stripAstroKeys(data);
  const result = getSchema(type).safeParse(content);
  if (!result.success) {
    for (const issue of result.error.issues) {
      const key = String(issue.path[0] ?? 'frontmatter');
      const message = `${issue.path.join('.') || 'frontmatter'}: ${issue.message}`;
      issues[key] = issues[key] ? `${issues[key]} | ${message}` : message;
    }
  }
  if (type !== 'skills' && (result.success ? result.data.status : content.status ?? 'published') === 'published' && !body.trim()) {
    issues.body = issues.body ? `${issues.body} | Published entries need a Markdown body` : 'Published entries need a Markdown body';
  }
  return issues;
}

/**
 * @param {string} type
 * @param {string} slug
 * @param {string} raw
 * @param {string} [source]
 * @returns {Record<string, any> & { slug: string, body: string }}
 */
export function parseEntry(type, slug, raw, source = `${type}/${slug}.md`) {
  try {
    slugSchema.parse(slug);
    const { data, content } = matter(raw);
    const metadata = stripAstroKeys(data);
    const issues = entryIssues(type, metadata, content);
    if (Object.keys(issues).length) throw new Error(Object.values(issues).join('; '));
    return { ...getSchema(type).parse(metadata), slug, body: content };
  } catch (error) {
    const details = error.issues?.map(issue => `${issue.path.join('.') || 'frontmatter'}: ${issue.message}`).join('; ') || error.message;
    throw new Error(`${source}: ${details}`);
  }
}

/**
 * @param {string} type
 * @param {{ includeDrafts?: boolean, root?: string }} [options]
 * @returns {Array<Record<string, any> & { slug: string, body: string }>}
 */
export function listEntries(type, { includeDrafts = false, root = contentRoot } = {}) {
  getSchema(type);
  const dir = path.join(root, type);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(file => file.endsWith('.md') && file !== TEMPLATE_FILE)
    .map(file => {
      const draft = file.startsWith(DRAFT_PREFIX);
      const slug = file.slice(draft ? 1 : 0, -'.md'.length);
      return parseEntry(type, slug, fs.readFileSync(path.join(dir, file), 'utf8'), path.join(dir, file));
    })
    .filter(entry => includeDrafts || entry.status === 'published')
    .sort((a, b) =>
      (type === 'blogs' ? b.date.localeCompare(a.date) : a.sort_index - b.sort_index) || a.slug.localeCompare(b.slug),
    );
}

/**
 * Does a file already own this slug? Creation never replaces one, so a form has
 * to say so before it saves rather than surface EEXIST afterwards.
 * @param {string} type
 * @param {string} slug
 * @param {{ root?: string }} [options]
 * @returns {boolean}
 */
export function entryExists(type, slug, options = {}) {
  try {
    const root = options && typeof options === 'object' && !Array.isArray(options) ? options.root ?? contentRoot : contentRoot;
    return resolvePath(type, slug, root) !== null;
  } catch {
    return false; // An unusable slug is a validation problem, not an existing entry.
  }
}

/**
 * @param {string} type
 * @param {string} slug
 * @param {{ includeDrafts?: boolean, root?: string }} [options]
 * @returns {(Record<string, any> & { slug: string, body: string }) | null}
 */
export function getEntry(type, slug, options = {}) {
  const includeDrafts = options.includeDrafts ?? false;
  const root = options.root ?? contentRoot;
  getSchema(type);
  if (!slugSchema.safeParse(slug).success) return null;
  const file = resolvePath(type, slug, root);
  if (!file) return null;
  const entry = parseEntry(type, slug, fs.readFileSync(file, 'utf8'), file);
  return includeDrafts || entry.status === 'published' ? entry : null;
}

/**
 * @param {string} type
 * @param {number} limit
 * @param {{ includeDrafts?: boolean, root?: string }} [options]
 * @returns {Array<Record<string, any> & { slug: string, body: string }>}
 */
export function featuredEntries(type, limit, options = {}) {
  return listEntries(type, options).filter(entry => entry.featured)
    .sort((a, b) => a.featured_order - b.featured_order || a.sort_index - b.sort_index || a.slug.localeCompare(b.slug))
    .slice(0, limit);
}

/**
 * @param {string} type
 * @param {string} slug
 * @param {string} [root]
 * @returns {string | null}
 */
export function readPublishedMarkdown(type, slug, rootOrOpts = contentRoot) {
  let root = contentRoot;
  if (typeof rootOrOpts === 'string') {
    root = rootOrOpts;
  } else if (rootOrOpts && typeof rootOrOpts === 'object' && !Array.isArray(rootOrOpts)) {
    root = rootOrOpts.root ?? contentRoot;
  }
  const entry = getEntry(type, slug, { root });
  if (!entry) return null;
  const file = resolvePath(type, slug, root);
  return file ? fs.readFileSync(file, 'utf8') : null;
}

/**
 * @param {string} [root]
 * @returns {{ count: number, errors: string[] }}
 */
export function validateContent(root = contentRoot) {
  const errors = [];
  let count = 0;
  for (const type of contentTypes) {
    const dir = path.join(root, type);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir).filter(file => file.endsWith('.md') && file !== TEMPLATE_FILE)) {
      const draft = file.startsWith(DRAFT_PREFIX);
      const slug = file.slice(draft ? 1 : 0, -'.md'.length);
      try {
        parseEntry(type, slug, fs.readFileSync(path.join(dir, file), 'utf8'), path.join(dir, file));
        count++;
      } catch (error) { errors.push(error.message); }
    }
  }
  return { count, errors };
}

/**
 * @param {string} type
 * @param {string} [root]
 * @returns {{ data: Record<string, any>, content: string }}
 */
export function readTemplate(type, root = contentRoot) {
  getSchema(type);
  return matter(fs.readFileSync(path.join(root, type, TEMPLATE_FILE), 'utf8'));
}

/**
 * @param {string} type
 * @param {string} slug
 * @param {Record<string, unknown>} [data]
 * @param {string} [body]
 * @param {string} [root]
 * @param {{ unset?: string[] }} [options] keys to drop, so a form can clear
 *   sample values inherited from the template
 * @returns {string}
 */
export function createEntry(type, slug, data = {}, body, root = contentRoot, { unset = [] } = {}) {
  // New entries are always drafts, so they land behind the underscore and stay
  // unrouted until they are published.
  const file = contentPath(type, slug, root, { draft: true });
  const template = readTemplate(type, root);
  const today = new Date().toISOString().slice(0, 10);
  const dates = type === 'experiences' ? { start_date: today } : type === 'skills' ? {} : { date: today };
  const metadata = { ...template.data, ...dates, status: 'draft', ...data };
  for (const key of unset) delete metadata[key];
  const raw = matter.stringify(body ?? template.content, metadata);
  parseEntry(type, slug, raw, file);
  fs.writeFileSync(file, raw, { flag: 'wx' }); // Never replace an existing entry.
  return file;
}

/**
 * @param {string} type
 * @param {string} slug
 * @param {Record<string, unknown>} data
 * @param {{ body?: string, unset?: string[], root?: string }} [options]
 * @returns {string}
 */
export function updateEntry(type, slug, data, { body, unset = [], root = contentRoot } = {}) {
  const file = resolvePath(type, slug, root);
  if (!file) throw new Error(`No ${type} entry named "${slug}"`);
  const previous = fs.readFileSync(file, 'utf8');
  const parsed = matter(previous);
  const metadata = { ...parsed.data, ...data };
  for (const key of unset) delete metadata[key];
  const raw = matter.stringify(body ?? parsed.content, metadata);
  parseEntry(type, slug, raw, file); // Validate before touching the original.
  // Publishing moves the file out from behind the underscore; unpublishing puts
  // it back. Keeping draft-ness in the filename is what keeps it unroutable.
  const status = getSchema(type).parse(stripAstroKeys(metadata)).status;
  const target = contentPath(type, slug, root, { draft: status !== 'published' });
  const temporary = `${target}.${process.pid}.tmp`;
  try {
    fs.writeFileSync(temporary, raw, { flag: 'wx' });
    fs.renameSync(temporary, target);
  } finally {
    if (fs.existsSync(temporary)) fs.unlinkSync(temporary);
  }
  if (target !== file && fs.existsSync(file)) fs.unlinkSync(file);
  return target;
}

/**
 * Renaming is intentionally absent: the slug is part of the public URL.
 * @param {string} type
 * @param {string} slug
 * @param {string} [root]
 * @returns {string}
 */
export function deleteEntry(type, slug, root = contentRoot) {
  const file = resolvePath(type, slug, root);
  if (!file) throw new Error(`No ${type} entry named "${slug}"`);
  fs.rmSync(file);
  return file;
}

/**
 * Preserve the input order so listing order and featured order remain independent.
 * @param {Array<Record<string, any>>} entries
 * @returns {Array<{ category: string, skills: Array<Record<string, any>> }>}
 */
export function groupSkills(entries) {
  const groups = new Map();
  for (const entry of entries) {
    if (!groups.has(entry.category)) groups.set(entry.category, []);
    groups.get(entry.category).push(entry);
  }
  return Array.from(groups, ([category, skills]) => ({ category, skills }));
}
