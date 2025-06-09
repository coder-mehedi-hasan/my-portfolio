import React from 'react';

type Blog = {
    title: string;
    excerpt: string;
    author: string;
    image: string;
};

const blogs: Blog[] = [
    {
        title: 'Building Scalable E-commerce Platforms',
        excerpt:
            'Discover the best practices and architecture choices that went into building a modern, scalable e-commerce platform.',
        author: 'John, CTO @ Acme',
        image: '/images/john.png', // Replace with actual image paths
    },
    {
        title: 'Creating Elegant Websites from Scratch',
        excerpt:
            'An inside look at designing and building an elegant website experience with a focus on UX and performance.',
        author: 'Sarah, Founder @ Bloom',
        image: '/images/sarah.png',
    },
];

export default function BlogsPage() {
    return (
        <div className="min-h-screen bg-white text-[#0e141b] font-body">
            <div className="max-w-5xl mx-auto px-4 py-10">
                <h2 className="text-2xl font-bold mb-8">Blogs</h2>

                <div className="flex flex-col gap-12">
                    {blogs.map((blog, idx) => (
                        <div key={idx} className="flex flex-col md:flex-row items-center gap-6">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                                <p className="text-base text-gray-800 mb-2">{`"${blog.excerpt}"`}</p>
                                <p className="text-sm text-[#7c7c7c]">{blog.author}</p>
                            </div>
                            <div className="w-40 h-40 flex-shrink-0 rounded-lg overflow-hidden">
                                <img
                                    src={blog.image}
                                    alt={blog.author}
                                    className="object-cover w-full h-full rounded-lg"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
