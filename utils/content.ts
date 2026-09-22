import { marked } from 'marked';
import type { z } from 'zod';
import { schemas } from '@/lib/content/schema.mjs';
import { listEntries, getEntry, featuredEntries, groupSkills } from '@/lib/content/store.mjs';

export type SkillItem = z.infer<typeof schemas.skills> & { slug: string; body: string };
export type ProjectItem = z.infer<typeof schemas.projects> & { slug: string; body: string };
export type ExperienceItem = z.infer<typeof schemas.experiences> & { slug: string; body: string };
export type ProjectDetail = ProjectItem & { content: string };
export type ExperienceDetail = ExperienceItem & { content: string };

export function getAllSkills(): SkillItem[] {
  return listEntries('skills') as SkillItem[];
}
export function getAllProjects(): ProjectItem[] {
  return listEntries('projects') as ProjectItem[];
}
export function getAllExperiences(): ExperienceItem[] {
  return listEntries('experiences') as ExperienceItem[];
}
export function getFeaturedProjects(limit = 2): ProjectItem[] {
  return featuredEntries('projects', limit) as ProjectItem[];
}
export type SkillGroup = { category: string; skills: SkillItem[] };
export type SkillDetail = SkillItem & { content: string };

export function getSkillGroups(): SkillGroup[] {
  return groupSkills(getAllSkills()) as SkillGroup[];
}
export function getFeaturedSkillGroups(): SkillGroup[] {
  const featured = featuredEntries('skills', Number.MAX_SAFE_INTEGER) as SkillItem[];
  return (groupSkills(featured) as SkillGroup[]).slice(0, 3)
    .map(group => ({ ...group, skills: group.skills.slice(0, 3) }));
}
export function getSkillBySlug(slug: string): SkillDetail | null {
  const entry = getEntry('skills', slug) as SkillItem | null;
  return entry ? { ...entry, content: marked.parse(entry.body, { async: false }) } : null;
}
export function getProjectBySlug(slug: string): ProjectDetail | null {
  const entry = getEntry('projects', slug) as ProjectItem | null;
  return entry ? { ...entry, content: marked.parse(entry.body, { async: false }) } : null;
}
export function getExperienceBySlug(slug: string): ExperienceDetail | null {
  const entry = getEntry('experiences', slug) as ExperienceItem | null;
  return entry ? { ...entry, content: marked.parse(entry.body, { async: false }) } : null;
}
