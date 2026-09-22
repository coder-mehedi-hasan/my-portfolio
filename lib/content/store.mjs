import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { getSchema, slugSchema, contentTypes } from './schema.mjs';

export const contentRoot = path.join(process.cwd(), 'content');

export function contentPath(type, slug, root = contentRoot) {
  getSchema(type);
  slugSchema.parse(slug);
  return path.join(root, type, `${slug}.md`);
}

export function parseEntry(type, slug, raw, source = `${type}/${slug}.md`) {
  try {
    slugSchema.parse(slug);
    const { data, content } = matter(raw);
    const metadata = getSchema(type).parse(data);
    if (type !== 'skills' && metadata.status === 'published' && !content.trim()) {
      throw new Error('Published entries need a Markdown body');
    }
    return { ...metadata, slug, body: content };
  } catch (error) {
    const details = error.issues?.map(issue => `${issue.path.join('.') || 'frontmatter'}: ${issue.message}`).join('; ') || error.message;
    throw new Error(`${source}: ${details}`);
  }
}

export function listEntries(type, { includeDrafts = false, root = contentRoot } = {}) {
  getSchema(type);
  const dir = path.join(root, type);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(file => file.endsWith('.md') && !file.startsWith('_')).map(file =>
    parseEntry(type, file.slice(0, -3), fs.readFileSync(path.join(dir, file), 'utf8'), path.join(dir, file)),
  ).filter(entry => includeDrafts || entry.status === 'published').sort((a, b) =>
    (type === 'blogs' ? b.date.localeCompare(a.date) : a.sort_index - b.sort_index) || a.slug.localeCompare(b.slug),
  );
}

export function getEntry(type, slug, { includeDrafts = false, root = contentRoot } = {}) {
  getSchema(type);
  if (!slugSchema.safeParse(slug).success) return null;
  const file = contentPath(type, slug, root);
  if (!fs.existsSync(file)) return null;
  const entry = parseEntry(type, slug, fs.readFileSync(file, 'utf8'), file);
  return includeDrafts || entry.status === 'published' ? entry : null;
}

export function featuredEntries(type, limit, options = {}) {
  return listEntries(type, options).filter(entry => entry.featured)
    .sort((a, b) => a.featured_order - b.featured_order || a.sort_index - b.sort_index || a.slug.localeCompare(b.slug))
    .slice(0, limit);
}

export function readPublishedMarkdown(type, slug, root = contentRoot) {
  return getEntry(type, slug, { root }) ? fs.readFileSync(contentPath(type, slug, root), 'utf8') : null;
}

export function validateContent(root = contentRoot) {
  const errors = [];
  let count = 0;
  for (const type of contentTypes) {
    const dir = path.join(root, type);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir).filter(file => file.endsWith('.md') && !file.startsWith('_'))) {
      try {
        parseEntry(type, file.slice(0, -3), fs.readFileSync(path.join(dir, file), 'utf8'), path.join(dir, file));
        count++;
      } catch (error) { errors.push(error.message); }
    }
  }
  return { count, errors };
}

export function createEntry(type, slug, data = {}, body, root = contentRoot) {
  const file = contentPath(type, slug, root);
  const template = matter(fs.readFileSync(path.join(root, type, '_template.md'), 'utf8'));
  const today = new Date().toISOString().slice(0, 10);
  const dates = type === 'experiences' ? { start_date: today } : type === 'skills' ? {} : { date: today };
  const raw = matter.stringify(body ?? template.content, { ...template.data, ...dates, status: 'draft', ...data });
  parseEntry(type, slug, raw, file);
  fs.writeFileSync(file, raw, { flag: 'wx' }); // Never replace an existing entry.
  return file;
}

export function updateEntry(type, slug, data, { body, unset = [], root = contentRoot } = {}) {
  const file = contentPath(type, slug, root);
  const previous = fs.readFileSync(file, 'utf8');
  const parsed = matter(previous);
  const metadata = { ...parsed.data, ...data };
  for (const key of unset) delete metadata[key];
  const raw = matter.stringify(body ?? parsed.content, metadata);
  parseEntry(type, slug, raw, file); // Validate before touching the original.
  const temporary = `${file}.${process.pid}.tmp`;
  try {
    fs.writeFileSync(temporary, raw, { flag: 'wx' });
    fs.renameSync(temporary, file);
  } finally {
    if (fs.existsSync(temporary)) fs.unlinkSync(temporary);
  }
  return file;
}

// Preserve the input order so listing order and featured order remain independent.
export function groupSkills(entries) {
  const groups = new Map();
  for (const entry of entries) {
    if (!groups.has(entry.category)) groups.set(entry.category, []);
    groups.get(entry.category).push(entry);
  }
  return Array.from(groups, ([category, skills]) => ({ category, skills }));
}
