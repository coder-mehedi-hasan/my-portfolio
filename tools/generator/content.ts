import path from 'node:path';
import {
  contentPath,
  contentRoot,
  createEntry,
  entryExists,
  entryIssues,
  listEntries,
  updateEntry,
} from '../../lib/content/store.mjs';
import { slugSchema } from '../../lib/content/schema.mjs';
import { slugify, titleOf, type ContentType, type FieldSpec } from './fields';

export interface EntryRecord extends Record<string, unknown> {
  slug: string;
  body: string;
  status: string;
  featured: boolean;
  sort_index: number;
}

export type FormValues = Record<string, string>;

export interface SaveResult {
  ok: boolean;
  slug?: string;
  file?: string;
  message: string;
  issues: Record<string, string>;
}

/** The store is the single source of truth for on-disk shape; read through it. */
export function loadEntries(type: ContentType): EntryRecord[] {
  return listEntries(type, { includeDrafts: true }) as unknown as EntryRecord[];
}

export function entryTitle(type: ContentType, entry: EntryRecord): string {
  return titleOf(type, entry, entry.slug);
}

export function toFormValues(type: ContentType, data: Record<string, unknown>): FormValues {
  const values: FormValues = {};
  for (const [key, value] of Object.entries(data)) {
    if (value === undefined || value === null) continue;
    values[key] = Array.isArray(value) ? value.join(', ') : String(value);
  }
  return values;
}

export function blankValues(specs: FieldSpec[]): FormValues {
  return Object.fromEntries(specs.map((spec) => [spec.key, spec.fallback]));
}

/**
 * Turn form strings into frontmatter. Empty optional fields are left out of
 * `data` and reported in `unset` so the store removes the existing key.
 */
export function toFrontmatter(
  specs: FieldSpec[],
  values: FormValues,
): { data: Record<string, unknown>; unset: string[] } {
  const data: Record<string, unknown> = {};
  const unset: string[] = [];
  for (const spec of specs) {
    if (spec.kind === 'body') continue;
    const raw = values[spec.key] ?? '';
    if (spec.kind === 'flag') {
      data[spec.key] = raw === 'true';
      continue;
    }
    const value = raw.trim();
    if (!value) {
      if (spec.required) data[spec.key] = raw;
      else unset.push(spec.key);
      continue;
    }
    if (spec.kind === 'list') {
      data[spec.key] = value.split(',').map((item) => item.trim()).filter(Boolean);
    } else if (spec.kind === 'number') {
      data[spec.key] = Number(value);
    } else {
      data[spec.key] = value;
    }
  }
  return { data, unset };
}

/** The slug a save will use: what was typed, or the title run through slugify. */
export function resolveSlug(titleKey: string, values: FormValues): string {
  return (values.slug ?? '').trim() || slugify(String(values[titleKey] ?? ''));
}

/** Notices are one line wide, so paths stay relative to the content tree. */
function target(type: ContentType, slug: string): string {
  try {
    const file = contentPath(type, slug);
    const inside = path.relative(contentRoot, file);
    if (inside && !inside.startsWith('..')) return `content/${inside}`;
  } catch {
    // An unusable slug still has an obvious destination to name in the message.
  }
  return `content/${type}/${slug || '<slug>'}.md`;
}

/** A slug already on disk, phrased as the fix rather than as a collision. */
export function slugConflict(type: ContentType, slug: string): string | null {
  if (!slug || !entryExists(type, slug)) return null;
  return `${slug} is taken. Use another slug — this generator only creates new entries.`;
}

const READABLE: Record<string, string> = {
  EEXIST: 'already exists',
  ENOENT: 'is missing',
  EACCES: 'cannot be written, no permission',
  EPERM: 'cannot be written, no permission',
  EBUSY: 'is locked by another process',
  ENOSPC: 'could not be written, the disk is full',
};

/** Store failures reach the form as one readable line, never as errno or a stack. */
function describeError(error: unknown, type: ContentType, slug: string): string {
  const zod = (error as { issues?: Array<{ message: string }> }).issues;
  if (zod) return zod.map((issue) => issue.message).join('; ');
  const code = (error as NodeJS.ErrnoException).code;
  if (code && READABLE[code]) return `${target(type, slug)} ${READABLE[code]}.`;
  return (error as Error).message;
}

function labelOf(specs: FieldSpec[], key: string): string {
  return specs.find((spec) => spec.key === key)?.label ?? key;
}

/** Every failure names the fields to fix, in the form's own vocabulary. */
function summarise(specs: FieldSpec[], issues: Record<string, string>): string {
  const names = Object.keys(issues).map((key) => labelOf(specs, key));
  const list = names.length === 1 ? names[0] : `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
  return `${list} ${names.length === 1 ? 'needs' : 'need'} attention.`;
}

export function failedSave(specs: FieldSpec[], issues: Record<string, string>, message?: string): SaveResult {
  return { ok: false, message: message ?? `Not saved — ${summarise(specs, issues)}`, issues };
}

/**
 * zod writes for a JSON dump, so its messages repeat the field name and talk
 * about characters. The form already prints the label, so say it in plain words.
 */
function plain(message: string): string {
  const text = message.replace(/^[a-z_]+: /, '');
  if (/at least 1 character/i.test(text)) return 'Required — cannot be empty.';
  if (/^Expected number/i.test(text)) return 'Use a number.';
  if (/invalid url/i.test(text)) return 'Use a URL, like https://example.com';
  return text;
}

function plainIssues(issues: Record<string, string>): Record<string, string> {
  const spoken: Record<string, string> = {};
  for (const [key, message] of Object.entries(issues)) {
    spoken[key] = [...new Set(message.split(' | ').map(plain))].join(' · ');
  }
  return spoken;
}

export function validate(
  type: ContentType,
  specs: FieldSpec[],
  values: FormValues,
  body: string,
  slug = '',
): Record<string, string> {
  const issues = plainIssues(entryIssues(type, toFrontmatter(specs, values).data, body));
  if (slug && !slugSchema.safeParse(slug).success) {
    const suggestion = slugify(slug);
    issues.slug = suggestion ? `Use kebab-case, like ${suggestion}.` : 'Use kebab-case, like my-entry.';
  }
  return issues;
}

export function createDraft(type: ContentType, slug: string, specs: FieldSpec[], values: FormValues, body: string): SaveResult {
  const issues = validate(type, specs, values, body, slug);
  if (Object.keys(issues).length) return failedSave(specs, issues);

  const conflict = slugConflict(type, slug);
  if (conflict) {
    return failedSave(specs, { slug: conflict }, `Not saved — ${target(type, slug)} already exists.`);
  }
  try {
    const { data, unset } = toFrontmatter(specs, values);
    const file = createEntry(type, slug, data, body, undefined, { unset });
    return { ok: true, slug, file, message: `Saved ${target(type, slug)}`, issues: {} };
  } catch (error) {
    return failedSave(specs, { slug: describeError(error, type, slug) });
  }
}

export function setFlags(type: ContentType, slug: string, patch: Record<string, unknown>): SaveResult {
  try {
    const file = updateEntry(type, slug, patch);
    const verb = patch.status === 'published' ? 'Published' : 'Moved back to draft';
    return { ok: true, slug, file, message: `${verb} ${target(type, slug)}`, issues: {} };
  } catch (error) {
    return { ok: false, message: `Not saved — ${describeError(error, type, slug)}`, issues: {} };
  }
}

export { slugify };
