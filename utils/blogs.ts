import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export type Blog = {
    slug: string;
    title: string;
    excerpt?: string;
    author?: string;
    date?: string;
    feature_image?: string;
    tags?: string[];
};

export type BlogDetail = Blog & {
    content: string;
};

const BLOGS_DIR = path.join(process.cwd(), 'content', 'blogs');

function readBlogFiles(): string[] {
    if (!fs.existsSync(BLOGS_DIR)) return [];
    return fs.readdirSync(BLOGS_DIR).filter((file) => file.endsWith('.md'));
}

function normalizeBlog(file: string): Blog {
    const raw = fs.readFileSync(path.join(BLOGS_DIR, file), 'utf8');
    const { data } = matter(raw);
    const date = data.date instanceof Date ? data.date.toISOString() : data.date;
    return { slug: file.replace(/\.md$/, ''), ...data, date } as Blog;
}

export function getAllBlogs(): Blog[] {
    return readBlogFiles()
        .map(normalizeBlog)
        .sort((a, b) => (b.date || '').localeCompare(a.date || ''));
}

export function getBlogBySlug(slug: string): BlogDetail | null {
    const filePath = path.join(BLOGS_DIR, `${slug}.md`);
    if (!fs.existsSync(filePath)) return null;

    const raw = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(raw);
    const date = data.date instanceof Date ? data.date.toISOString() : data.date;

    return { slug, ...data, date, content: marked.parse(content) } as BlogDetail;
}
