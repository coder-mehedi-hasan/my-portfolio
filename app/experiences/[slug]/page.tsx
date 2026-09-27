import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import React from 'react';
import { getAllExperiences, getExperienceBySlug } from '@/utils/content';

export function generateStaticParams() {
    return getAllExperiences().map((exp) => ({ slug: exp.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const experience = getExperienceBySlug(slug);

    if (!experience) {
        return {};
    }

    return {
        title: `${experience.designation} at ${experience.company_name}`,
        description: experience.description,
        alternates: {
            canonical: `/experiences/${experience.slug}`,
        },
    };
}

export default async function ExperienceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const experience = getExperienceBySlug(slug);

    if (!experience) {
        notFound();
    }

    return (
        <main className="detail-page">
            <div className="detail-shell">
                <Link href="/experience" className="back-link">
                    ← All experience
                </Link>

                <h1 className="detail-title">{experience.designation}</h1>
                <p className="detail-description">
                    {experience.company_name}
                    {experience.location ? `, ${experience.location}` : ''}
                </p>

                <div className="detail-meta">
                    <span>
                        {experience.start_date} - {experience.end_date || 'Present'}
                    </span>
                    {experience.job_type && (
                        <span className="tag">
                            {experience.job_type}
                        </span>
                    )}
                </div>

                <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: experience.content }}
                />
            </div>
        </main>
    );
}
