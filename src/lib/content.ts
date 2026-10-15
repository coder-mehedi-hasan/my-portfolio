import matter from 'gray-matter';

/**
 * Detail pages are real Markdown pages under `src/pages/<type>/`, so this module
 * reads them straight off disk with Vite's `import.meta.glob`. Frontmatter is
 * parsed by hand (rather than pulled from a content collection) so the same
 * files can be routed by Astro without a second source of truth.
 */
export type EntryData = Record<string, any>;

export interface ContentEntry {
  id: string;
  data: EntryData;
  body: string;
}

export type BlogEntry = ContentEntry;
export type ProjectEntry = ContentEntry;
export type ExperienceEntry = ContentEntry;
export type SkillEntry = ContentEntry;

export type SkillGroup = { category: string; skills: SkillEntry[] };

type RawSources = Record<string, string>;

const projectSources = import.meta.glob('/src/pages/projects/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as RawSources;
const experienceSources = import.meta.glob('/src/pages/experiences/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as RawSources;
const skillSources = import.meta.glob('/src/pages/skills/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as RawSources;
const blogSources = import.meta.glob('/src/pages/blogs/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as RawSources;

/** YAML turns an unquoted `2024-01-15` into a `Date`; the site always wants text. */
export function toDateString(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? '');
}

/** Schema defaults the old content collection applied at parse time. */
function normalize(type: string, data: EntryData): EntryData {
  const base: EntryData = {
    status: data.status ?? 'published',
    sort_index: data.sort_index ?? 0,
    featured: data.featured ?? false,
    featured_order: data.featured_order ?? 0,
    ...data,
  };
  if (type === 'projects') {
    return { ...base, tools: data.tools ?? [], date: toDateString(data.date) };
  }
  if (type === 'blogs') {
    return {
      ...base,
      author: data.author ?? 'Md Mehedi Hasan',
      feature_image: data.feature_image ?? '/me.jpg',
      tags: data.tags ?? [],
      date: toDateString(data.date),
      modified_date: data.modified_date ? toDateString(data.modified_date) : undefined,
    };
  }
  return base;
}

/** Underscore files (`_template.md`, drafts) are never content. */
function entriesFrom(type: string, sources: RawSources): ContentEntry[] {
  return Object.entries(sources)
    .map(([filePath, raw]) => {
      const id = (filePath.split('/').pop() ?? '').replace(/\.md$/, '');
      if (id.startsWith('_')) return null;
      const { data, content } = matter(raw);
      return { id, data: normalize(type, data), body: content };
    })
    .filter((entry): entry is ContentEntry => entry !== null);
}

const byId = (a: { id: string }, b: { id: string }) => a.id.localeCompare(b.id);

/** Blogs are newest-first; everything else follows the hand-authored `sort_index`. */
export async function getPublishedBlogs(): Promise<BlogEntry[]> {
  return entriesFrom('blogs', blogSources)
    .filter((entry) => entry.data.status === 'published')
    .sort((a, b) => String(b.data.date).localeCompare(String(a.data.date)) || byId(a, b));
}

export async function getPublishedProjects(): Promise<ProjectEntry[]> {
  return entriesFrom('projects', projectSources)
    .filter((entry) => entry.data.status === 'published')
    .sort((a, b) => a.data.sort_index - b.data.sort_index || byId(a, b));
}

export async function getPublishedExperiences(): Promise<ExperienceEntry[]> {
  return entriesFrom('experiences', experienceSources)
    .filter((entry) => entry.data.status === 'published')
    .sort((a, b) => a.data.sort_index - b.data.sort_index || byId(a, b));
}

export async function getPublishedSkills(): Promise<SkillEntry[]> {
  return entriesFrom('skills', skillSources)
    .filter((entry) => entry.data.status === 'published')
    .sort((a, b) => a.data.sort_index - b.data.sort_index || byId(a, b));
}

export async function getFeaturedProjects(limit = 2): Promise<ProjectEntry[]> {
  const entries = await getPublishedProjects();
  return entries
    .filter((entry) => entry.data.featured)
    .sort(
      (a, b) =>
        a.data.featured_order - b.data.featured_order ||
        a.data.sort_index - b.data.sort_index ||
        byId(a, b),
    )
    .slice(0, limit);
}

export async function getFeaturedExperiences(limit = Number.MAX_SAFE_INTEGER): Promise<ExperienceEntry[]> {
  const entries = await getPublishedExperiences();
  return entries
    .filter((entry) => entry.data.featured)
    .sort(
      (a, b) =>
        a.data.featured_order - b.data.featured_order ||
        a.data.sort_index - b.data.sort_index ||
        byId(a, b),
    )
    .slice(0, limit);
}

/** Preserve input order so listing order and featured order stay independent. */
export function groupSkills(entries: SkillEntry[]): SkillGroup[] {
  const groups = new Map<string, SkillEntry[]>();
  for (const entry of entries) {
    if (!groups.has(entry.data.category)) groups.set(entry.data.category, []);
    groups.get(entry.data.category)!.push(entry);
  }
  return Array.from(groups, ([category, skills]) => ({ category, skills }));
}

export async function getSkillGroups(): Promise<SkillGroup[]> {
  return groupSkills(await getPublishedSkills());
}

export async function getFeaturedSkillGroups(): Promise<SkillGroup[]> {
  const entries = await getPublishedSkills();
  const featured = entries
    .filter((entry) => entry.data.featured)
    .sort(
      (a, b) =>
        a.data.featured_order - b.data.featured_order ||
        a.data.sort_index - b.data.sort_index ||
        byId(a, b),
    );
  return groupSkills(featured)
    .slice(0, 3)
    .map((group) => ({ ...group, skills: group.skills.slice(0, 3) }));
}

export async function getPublishedBlog(id: string): Promise<BlogEntry | undefined> {
  return (await getPublishedBlogs()).find((entry) => entry.id === id);
}

export async function getPublishedProject(id: string): Promise<ProjectEntry | undefined> {
  return (await getPublishedProjects()).find((entry) => entry.id === id);
}

export async function getPublishedExperience(id: string): Promise<ExperienceEntry | undefined> {
  return (await getPublishedExperiences()).find((entry) => entry.id === id);
}

export async function getPublishedSkill(id: string): Promise<SkillEntry | undefined> {
  return (await getPublishedSkills()).find((entry) => entry.id === id);
}

/** A skill page without a body is thin content and must not be indexed. */
export function isThinSkill(entry: SkillEntry): boolean {
  return !(entry.body ?? '').trim();
}

export function formatDate(value: string, options: Intl.DateTimeFormatOptions): string {
  return new Date(value).toLocaleDateString('en-US', options);
}
