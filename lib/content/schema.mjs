import { z } from 'zod';

const text = z.string().trim().min(1);
const date = z.preprocess(
  value => value instanceof Date ? value.toISOString().slice(0, 10) : value,
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD').refine(value => {
    const parsed = new Date(`${value}T00:00:00Z`);
    return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
  }, 'Use a real calendar date'),
);
const webUrl = text.url().refine(value => /^https?:\/\//.test(value), 'Use an http(s) URL');
const image = text.refine(value => /^\/(?!\/)/.test(value) || /^https?:\/\//.test(value), 'Use a /public-path or http(s) URL');
const common = {
  status: z.enum(['draft', 'published']).default('published'),
  sort_index: z.number().int().nonnegative().default(0),
  featured: z.boolean().default(false),
  featured_order: z.number().int().nonnegative().default(0),
};

export const schemas = {
  projects: z.object({
    ...common, title: text, sub_title: text, description: text.optional(), date,
    tools: z.array(text).default([]), image: image.optional(), icon: text.optional(),
    live_url: webUrl.optional(), url: webUrl.optional(),
  }).strict(),
  experiences: z.object({
    ...common, designation: text, company_name: text, location: text,
    job_type: text.optional(), description: text.optional(), icon: text.optional(),
    start_date: date, end_date: date.optional(),
  }).strict().refine(value => !value.end_date || value.end_date >= value.start_date, {
    path: ['end_date'], message: 'End date must be on or after start date',
  }),
  skills: z.object({
    ...common, title: text, category: text, sub_title: text, description: text.optional(), icon: text.optional(),
  }).strict(),
  blogs: z.object({
    ...common, title: text, excerpt: text, date,
    author: text.default('Md Mehedi Hasan'), feature_image: image.default('/me.png'),
    tags: z.array(text).default([]),
  }).strict(),
};

export const contentTypes = Object.keys(schemas);
export const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use a kebab-case slug, e.g. my-project');

export function getSchema(type) {
  if (!Object.hasOwn(schemas, type)) throw new Error(`Unknown content type "${type}". Choose: ${contentTypes.join(', ')}`);
  return schemas[type];
}
