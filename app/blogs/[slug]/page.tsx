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
    let { slug } = await params;

    if (slug.endsWith('.md')) {
        redirect(`/blogs/raw/${slug.slice(0, -3)}`);
    }

    const blog = getBlogBySlug(slug);

    if (!blog) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white text-[#0e141b] font-body">
            <div className="max-w-3xl mx-auto px-4 py-10">
                <Link href="/blogs" className="text-sm text-[#1980e6] hover:underline">
                    ← Back to Blogs
                </Link>

                <h1 className="text-3xl font-bold mt-4 mb-3">{blog.title}</h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-[#7c7c7c] mb-8">
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
                        <span key={tag} className="rounded-lg bg-[#e7edf3] px-2 py-1 text-xs font-medium">
                            {tag}
                        </span>
                    ))}
                </div>

                {blog.feature_image && (
                    <div className="w-full rounded-xl overflow-hidden mb-8">
                        <img src={blog.feature_image} alt={blog.title} loading="lazy" className="w-full object-cover" />
                    </div>
                )}

                <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />
            </div>
        </div>
    );
}
