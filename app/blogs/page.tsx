import Link from 'next/link';
import React from 'react';
import type { Metadata } from 'next';
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

    return (
        <div className="min-h-screen bg-white text-[#0e141b] font-body">
            <div className="max-w-5xl mx-auto px-4 py-10">
                <h2 className="text-2xl font-bold mb-8">Blogs</h2>

                {blogs.length === 0 && (
                    <p className="text-[#4e7397] text-sm">No blogs yet.</p>
                )}

                <div className="flex flex-col gap-12">
                    {blogs.map((blog) => (
                        <Link
                            key={blog.slug}
                            href={`/blogs/${blog.slug}`}
                            className="flex flex-col md:flex-row items-center gap-6 hover:opacity-80 transition"
                        >
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                                <p className="text-base text-gray-800 mb-2">{`"${blog.excerpt}"`}</p>
                                <p className="text-sm text-[#7c7c7c]">{blog.author}</p>
                                {blog.date && (
                                    <p className="text-sm text-[#7c7c7c]">
                                        {new Date(blog.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                )}
                            </div>
                            {blog.feature_image && (
                                <div className="w-40 h-40 flex-shrink-0 rounded-lg overflow-hidden">
                                    <img
                                        src={blog.feature_image}
                                        alt={blog.title}
                                        loading="lazy"
                                        width={160}
                                        height={160}
                                        className="object-cover w-full h-full rounded-lg"
                                    />
                                </div>
                            )}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
