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

const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'Present';
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
};

export default async function ExperienceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const experience = getExperienceBySlug(slug);

    if (!experience) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white text-[#0e141b] font-body">
            <div className="max-w-3xl mx-auto px-4 py-10">
                <Link href="/experience" className="text-sm text-[#1980e6] hover:underline">
                    ← Back to Experience
                </Link>

                <h1 className="text-3xl font-bold mt-4 mb-2">{experience.designation}</h1>
                <p className="text-lg text-[#4e7397] mb-3">
                    {experience.company_name}
                    {experience.location ? `, ${experience.location}` : ''}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-sm text-[#7c7c7c] mb-8">
                    <span>
                        {formatDate(experience.start_date)} - {formatDate(experience.end_date)}
                    </span>
                    {experience.job_type && (
                        <span className="rounded-lg bg-[#e7edf3] px-2 py-1 text-xs font-medium">
                            {experience.job_type}
                        </span>
                    )}
                </div>

                <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: experience.content }}
                />
            </div>
        </div>
    );
}
