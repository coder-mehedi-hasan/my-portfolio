import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const CONTENT_DIR = path.join(process.cwd(), 'content');

function readDir(dir: string): string[] {
    const full = path.join(CONTENT_DIR, dir);
    if (!fs.existsSync(full)) return [];
    return fs.readdirSync(full).filter((file) => file.endsWith('.md') && !file.startsWith('_'));
}

function normalizeDates(data: Record<string, unknown>): Record<string, unknown> {
    for (const key of Object.keys(data)) {
        if (data[key] instanceof Date) {
            data[key] = (data[key] as Date).toISOString();
        }
    }
    return data;
}

function readFrontmatter<T>(dir: string): Array<T & { slug: string }> {
    return readDir(dir).map((file) => {
        const raw = fs.readFileSync(path.join(CONTENT_DIR, dir, file), 'utf8');
        const { data } = matter(raw);
        return { slug: file.replace(/\.md$/, ''), ...normalizeDates(data) } as T & { slug: string };
    });
}

function readWithBody<T>(dir: string, slug: string): (T & { slug: string; content: string }) | null {
    const filePath = path.join(CONTENT_DIR, dir, `${slug}.md`);
    if (!fs.existsSync(filePath)) return null;

    const raw = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(raw);

    return { slug, ...normalizeDates(data), content: marked.parse(content) } as T & {
        slug: string;
        content: string;
    };
}

export type SkillItem = {
    slug: string;
    title: string;
    sub_title?: string;
    description?: string;
    icon?: string;
    sort_index?: number;
};

export type ProjectItem = {
    slug: string;
    title: string;
    sub_title?: string;
    description?: string;
    icon?: string;
    tools?: string[];
    date?: string;
    image?: string;
    live_url?: string;
    sort_index?: number;
};

export type ExperienceItem = {
    slug: string;
    designation: string;
    company_name: string;
    location: string;
    job_type?: string;
    description?: string;
    icon?: string;
    start_date?: string;
    end_date?: string;
    sort_index?: number;
};

export type ProjectDetail = ProjectItem & { content: string };
export type ExperienceDetail = ExperienceItem & { content: string };

export function getAllSkills(): SkillItem[] {
    return readFrontmatter<Omit<SkillItem, 'slug'>>('skills').sort(
        (a, b) => (a.sort_index ?? 0) - (b.sort_index ?? 0)
    );
}

export function getAllProjects(): ProjectItem[] {
    return readFrontmatter<Omit<ProjectItem, 'slug'>>('projects').sort(
        (a, b) => (a.sort_index ?? 0) - (b.sort_index ?? 0)
    );
}

export function getAllExperiences(): ExperienceItem[] {
    return readFrontmatter<Omit<ExperienceItem, 'slug'>>('experiences').sort(
        (a, b) => (a.sort_index ?? 0) - (b.sort_index ?? 0)
    );
}

export function getProjectBySlug(slug: string): ProjectDetail | null {
    return readWithBody<Omit<ProjectItem, 'slug'>>('projects', slug);
}

export function getExperienceBySlug(slug: string): ExperienceDetail | null {
    return readWithBody<Omit<ExperienceItem, 'slug'>>('experiences', slug);
}
