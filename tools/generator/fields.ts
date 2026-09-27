import { schemas } from '../../lib/content/schema.mjs';

export type ContentType = 'projects' | 'experiences' | 'skills' | 'blogs';

export const contentTypes = Object.keys(schemas) as ContentType[];

export type FieldKind = 'text' | 'long' | 'list' | 'number' | 'flag' | 'choice' | 'body';

export interface FieldSpec {
  key: string;
  label: string;
  kind: FieldKind;
  required: boolean;
  choices: string[];
  placeholder: string;
  help: string;
  fallback: string;
}

/** The field that names an entry in the list. */
const titleKey: Record<ContentType, string> = {
  projects: 'title',
  experiences: 'company_name',
  skills: 'title',
  blogs: 'title',
};

/** Ordering and visibility are set in the schema, not in the form. */
const placementKeys = new Set(['status', 'sort_index', 'featured', 'featured_order']);

const acronyms: Record<string, string> = { url: 'URL', id: 'ID', api: 'API', seo: 'SEO' };

function humanize(key: string): string {
  return key
    .split('_')
    .map((word) => acronyms[word] ?? word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/** The slice of zod's internals the form needs in order to describe a field. */
interface ZodNode {
  _def?: {
    typeName?: string;
    innerType?: ZodNode;
    schema?: ZodNode;
    values?: readonly string[];
    shape?: () => Record<string, ZodNode>;
  };
}

/** Peel the wrappers zod adds so the underlying type is visible. */
function unwrap(node: ZodNode | undefined): ZodNode | undefined {
  let current = node;
  for (let depth = 0; depth < 12; depth += 1) {
    const def = current?._def;
    if (!def) break;
    if (def.typeName === 'ZodEffects') current = def.schema;
    else if (def.typeName === 'ZodOptional' || def.typeName === 'ZodDefault' || def.typeName === 'ZodNullable') current = def.innerType;
    else break;
  }
  return current;
}

function baseKind(raw: ZodNode): FieldKind {
  switch (raw?._def?.typeName) {
    case 'ZodArray':
      return 'list';
    case 'ZodNumber':
      return 'number';
    case 'ZodBoolean':
      return 'flag';
    case 'ZodEnum':
      return 'choice';
    default:
      return 'text';
  }
}

function enumChoices(raw: ZodNode): string[] {
  const values = unwrap(raw)?._def?.values;
  return values ? [...values] : [];
}

type Overrides = Partial<Pick<FieldSpec, 'label' | 'kind' | 'placeholder' | 'help' | 'fallback'>>;

const shared: Record<string, Overrides> = {
  status: { kind: 'choice', fallback: 'draft', help: 'Drafts stay out of the site until a build picks them up.' },
  featured: { kind: 'flag', help: 'Homepage only. Projects and skill groups read this flag.' },
  featured_order: { kind: 'number', help: 'Lower numbers appear first among featured entries.' },
  sort_index: { kind: 'number', help: 'Lower numbers come first in the full listing.' },
  description: { kind: 'long', placeholder: 'One or two sentences. Shown under the title.' },
  icon: { placeholder: 'fa-brands fa-github', help: 'Optional Font Awesome class name.' },
  live_url: { placeholder: 'https://example.com' },
  url: { placeholder: 'https://example.com' },
  image: { placeholder: '/projects/example.png', help: 'A path under /public, or an http(s) URL.' },
  feature_image: { placeholder: '/me.png', help: 'A path under /public, or an http(s) URL.' },
  tools: { kind: 'list', placeholder: 'TypeScript, PostgreSQL', help: 'Comma separated.' },
  tags: { kind: 'list', placeholder: 'performance, nextjs', help: 'Comma separated.' },
};

const perType: Record<ContentType, Record<string, Overrides>> = {
  projects: {
    title: { placeholder: 'Project name' },
    sub_title: { placeholder: 'A short description of the product' },
    date: { placeholder: '2026-01-01', help: 'YYYY-MM-DD. Newest first on /projects.' },
  },
  experiences: {
    designation: { placeholder: 'Frontend Developer' },
    company_name: { placeholder: 'Company name' },
    location: { placeholder: 'City or country' },
    job_type: { placeholder: 'Full-time' },
    start_date: {
      placeholder: 'September 2023',
      help: 'Shown on the site exactly as typed, so any format works.',
    },
    end_date: {
      placeholder: 'January 2025',
      help: 'Leave empty for a current role. The site shows Present when this is unset.',
    },
  },
  skills: {
    title: { placeholder: 'Skill name' },
    category: { placeholder: 'Frontend & mobile', help: 'The Skills page groups by this field. Reuse the same spelling.' },
    sub_title: { placeholder: 'A short description of this skill.' },
  },
  blogs: {
    title: { placeholder: 'Article title' },
    excerpt: { kind: 'long', placeholder: 'A short summary of what readers will learn.' },
    author: { placeholder: 'Md Mehedi Hasan' },
    date: { placeholder: '2026-01-01', help: 'YYYY-MM-DD. Newest first on /blogs.' },
  },
};

function describe(key: string, raw: ZodNode, overrides: Overrides): FieldSpec {
  const kind = overrides.kind ?? baseKind(raw);
  return {
    key,
    label: overrides.label ?? humanize(key),
    kind,
    required: raw?._def?.typeName !== 'ZodOptional' && raw?._def?.typeName !== 'ZodDefault',
    choices: kind === 'choice' ? enumChoices(raw) : [],
    placeholder: overrides.placeholder ?? '',
    help: overrides.help ?? '',
    fallback: overrides.fallback ?? '',
  };
}

/** The body is a pseudo-field: it is validated but never written to frontmatter. */
const bodyField: FieldSpec = {
  key: 'body',
  label: 'Body',
  kind: 'body',
  required: true,
  choices: [],
  placeholder: 'Markdown',
  help: 'Published entries need a Markdown body. ctrl+e opens the editor.',
  fallback: '',
};

export interface CollectionFields {
  type: ContentType;
  titleKey: string;
  titleLabel: string;
  body: FieldSpec;
  /** Slug, then the entry fields, then publishing controls, then the body. */
  all: FieldSpec[];
  publishable: FieldSpec[];
}

export function fieldsFor(type: ContentType): CollectionFields {
  const schema = unwrap(schemas[type]);
  const shape = schema?._def?.shape?.() ?? {};
  const specs = Object.entries(shape).map(([key, raw]) => describe(key, raw, { ...shared[key], ...perType[type][key] }));
  const entryFields = specs.filter((spec) => !placementKeys.has(spec.key));
  const placementFields = specs.filter((spec) => placementKeys.has(spec.key));
  const publishable = placementFields.map((spec) => (spec.key === 'status' ? { ...spec, fallback: spec.fallback || 'draft' } : spec));
  const titleSpec = specs.find((spec) => spec.key === titleKey[type]) ?? entryFields[0];
  return {
    type,
    titleKey: titleKey[type],
    titleLabel: titleSpec?.label ?? 'Title',
    body: bodyField,
    all: [...entryFields, ...publishable, bodyField],
    publishable,
  };
}

export function titleOf(type: ContentType, data: Record<string, unknown>, slug: string): string {
  const value = data[titleKey[type]];
  return typeof value === 'string' && value.trim() ? value.trim() : slug;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['"’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
    .replace(/-+$/g, '');
}
