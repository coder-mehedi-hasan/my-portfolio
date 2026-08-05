import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import { getAllProjects, getProjectBySlug } from '@/utils/content';

export function generateStaticParams() {
    return getAllProjects().map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white text-[#0e141b] font-body">
            <div className="max-w-3xl mx-auto px-4 py-10">
                <Link href="/projects" className="text-sm text-[#1980e6] hover:underline">
                    ← Back to Projects
                </Link>

                <h1 className="text-3xl font-bold mt-4 mb-2">{project.title}</h1>
                {project.sub_title && (
                    <p className="text-lg text-[#4e7397] mb-3">{project.sub_title}</p>
                )}

                <div className="flex flex-wrap items-center gap-3 text-sm text-[#7c7c7c] mb-8">
                    {project.date && (
                        <span>
                            {new Date(project.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                            })}
                        </span>
                    )}
                    {project.live_url && (
                        <a
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg bg-[#1980e6] px-3 py-1 text-xs font-bold text-white hover:opacity-80"
                        >
                            Live Site
                        </a>
                    )}
                    {project.tools?.map((tool) => (
                        <span key={tool} className="rounded-lg bg-[#e7edf3] px-2 py-1 text-xs font-medium">
                            {tool}
                        </span>
                    ))}
                </div>

                {project.image && (
                    <div className="w-full rounded-xl overflow-hidden mb-8">
                        <img src={project.image} alt={project.title} className="w-full object-cover" />
                    </div>
                )}

                <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: project.content }}
                />
            </div>
        </div>
    );
}
