import PageIntro from '@/components/site/PageIntro';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllBlogs } from '@/utils/blogs';
export const metadata: Metadata = {
    title: 'Blogs',
    description:
        'Articles and tutorials written by Md Mehedi Hasan covering web development, e-commerce platforms, deployment and more.',
    alternates: {
        canonical: '/blogs',
    },
};

export default function BlogsPage() {
 const blogs = getAllBlogs();
 return <main className="page-shell"><PageIntro eyebrow="Notes & ideas" title="Writing." description="Things I’ve learned while building software. Practical notes on development, problem-solving, and shipping to production." /><div className="editorial-list">{blogs.length === 0 && <p className="empty-state">No articles yet. Check back soon.</p>}{blogs.map(blog => <Link className="editorial-row" key={blog.slug} href={`/blogs/${blog.slug}`}><p className="row-meta">{blog.date && new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}</p><div><h2>{blog.title}</h2><p className="mt-3">{blog.excerpt}</p><p className="row-meta mt-4">{blog.author}</p></div><span aria-hidden="true">↗</span></Link>)}</div></main>;
}
