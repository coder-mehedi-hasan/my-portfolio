import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import React from 'react';
import { getAllProjects, getProjectBySlug } from '@/utils/content';

export function generateStaticParams() {
    return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        return {};
    }

    return {
        title: project.title,
        description: project.description ?? project.sub_title,
        alternates: {
            canonical: `/projects/${project.slug}`,
        },
        openGraph: {
            title: project.title,
            description: project.description ?? project.sub_title,
            type: 'article',
            publishedTime: project.date,
            tags: project.tools,
            images: project.image ? [{ url: project.image, alt: project.title }] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title: project.title,
            description: project.description ?? project.sub_title,
            images: project.image ? [project.image] : undefined,
        },
    };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    const projectUrl = project.live_url ?? project.url;
    const projectUrlLabel = projectUrl?.includes('github.com') ? 'Source Code' : 'Live Site';

    return (
        <main className="detail-page">
            <div className="detail-shell">
                <Link href="/projects" className="back-link">
                    ← All projects
                </Link>

                <h1 className="detail-title">{project.title}</h1>
                {project.sub_title && (
                    <p className="detail-description">{project.sub_title}</p>
                )}

                <div className="detail-meta">
                    {project.date && (
                        <span>
                            {new Date(project.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                            })}
                        </span>
                    )}
                    {projectUrl && (
                        <a
                            href={projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="button-primary"
                        >
                            {projectUrlLabel}
                        </a>
                    )}
                    {project.tools?.map((tool) => (
                        <span key={tool} className="tag">
                            {tool}
                        </span>
                    ))}
                </div>

                {project.image && (
                    <div className="detail-image">
                        <Image
                            src={project.image}
                            alt={project.title}
                            loading="lazy"
                            className="w-full object-cover"
                            width={1200}
                            height={630}
                        />
                    </div>
                )}

                <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: project.content }}
                />
            </div>
        </main>
    );
}
