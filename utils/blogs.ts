import { marked } from 'marked';
import type { z } from 'zod';
import { schemas } from '@/lib/content/schema.mjs';
import { listEntries, getEntry } from '@/lib/content/store.mjs';

export type Blog = z.infer<typeof schemas.blogs> & { slug: string; body: string };
export type BlogDetail = Blog & { content: string };

export function getAllBlogs(): Blog[] {
  return listEntries('blogs') as Blog[];
}
export function getBlogBySlug(slug: string): BlogDetail | null {
  const entry = getEntry('blogs', slug) as Blog | null;
  return entry ? { ...entry, content: marked.parse(entry.body, { async: false }) } : null;
}
