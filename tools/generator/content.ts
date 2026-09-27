import { createEntry, entryIssues, listEntries, updateEntry } from '../../lib/content/store.mjs';
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

export function validate(type: ContentType, specs: FieldSpec[], values: FormValues, body: string): Record<string, string> {
  const { data } = toFrontmatter(specs, values);
  return entryIssues(type, data, body);
}

export function createDraft(type: ContentType, slug: string, specs: FieldSpec[], values: FormValues, body: string): SaveResult {
  const issues = validate(type, specs, values, body);
  if (Object.keys(issues).length) return { ok: false, message: 'Fix the highlighted fields first.', issues };
  try {
    const { data, unset } = toFrontmatter(specs, values);
    const file = createEntry(type, slug, data, body, undefined, { unset });
    return { ok: true, slug, file, message: `Created ${slug}`, issues: {} };
  } catch (error) {
    return { ok: false, message: (error as Error).message, issues: {} };
  }
}

export function setFlags(type: ContentType, slug: string, patch: Record<string, unknown>): SaveResult {
  try {
    const file = updateEntry(type, slug, patch);
    return { ok: true, slug, file, message: `Updated ${slug}`, issues: {} };
  } catch (error) {
    return { ok: false, message: (error as Error).message, issues: {} };
  }
}

export { slugify };
