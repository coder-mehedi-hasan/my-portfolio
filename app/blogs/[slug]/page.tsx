import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import React from 'react';
import { getAllBlogs, getBlogBySlug } from '@/utils/blogs';

export function generateStaticParams() {
    return getAllBlogs().map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const blog = getBlogBySlug(slug);

    if (!blog) {
        return {};
    }

    return {
        title: blog.title,
        description: blog.excerpt,
        alternates: {
            canonical: `/blogs/${blog.slug}`,
        },
        openGraph: {
            title: blog.title,
            description: blog.excerpt,
            type: 'article',
            publishedTime: blog.date,
            tags: blog.tags,
            images: blog.feature_image ? [{ url: blog.feature_image }] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title: blog.title,
            description: blog.excerpt,
            images: blog.feature_image ? [blog.feature_image] : undefined,
        },
    };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    if (slug.endsWith('.md')) {
        redirect(`/blogs/raw/${slug.slice(0, -3)}`);
    }

    const blog = getBlogBySlug(slug);

    if (!blog) {
        notFound();
    }

    return (
        <main className="detail-page">
            <div className="detail-shell">
                <Link href="/blogs" className="back-link">
                    ← All writing
                </Link>

                <h1 className="detail-title">{blog.title}</h1>
                <div className="detail-meta">
                    {blog.author && <span>{blog.author}</span>}
                    {blog.date && (
                        <span>
                            {new Date(blog.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </span>
                    )}
                    {blog.tags?.map((tag) => (
                        <span key={tag} className="tag">
                            {tag}
                        </span>
                    ))}
                </div>



                <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />
            </div>
        </main>
    );
}
