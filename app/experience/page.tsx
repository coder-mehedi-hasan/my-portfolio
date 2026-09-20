import Link from 'next/link';
import React from 'react';
import type { Metadata } from 'next';
import DynamicFAIcon from '@/components/DynamicFAIcon';
import { getAllExperiences } from '@/utils/content';

export const metadata: Metadata = {
    title: 'Experience',
    description:
        'Professional work experience of Md Mehedi Hasan, a full-stack developer specializing in front-end and back-end development.',
    alternates: {
        canonical: '/experience',
    },
};

const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'Present';
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
};

const ExperiencePage: React.FC = () => {
    const experiences = getAllExperiences();

    return (
        <div className="min-h-screen bg-[#fafaf9] text-[#111211] font-body">
            <div className="max-w-5xl mx-auto px-4 py-10">
                <SectionTitle title="Experience" description="A selection of roles I've worked in." />

                <div className="flex flex-col gap-4 p-4">
                    {experiences.map((exp) => (
                        <Link
                            key={exp.slug}
                            href={`/experiences/${exp.slug}`}
                            className="border rounded-xl bg-white p-4 flex items-start gap-4 hover:opacity-80 transition"
                        >
                            <div className="text-[#0e141b] flex items-center justify-center rounded-lg bg-[#e7edf3] shrink-0 size-12">
                                <DynamicFAIcon icon={`${exp.icon ?? 'fa-solid fa-briefcase'} fa-lg`} />
                            </div>
                            <div className="flex flex-1 flex-col gap-1">
                                <p className="text-base font-medium leading-normal">{exp.designation}</p>
                                <p className="text-[#4e7397] text-sm font-normal leading-normal">
                                    {exp.company_name}, {exp.location}
                                    {exp.job_type ? ` · ${exp.job_type}` : ''}
                                </p>
                                <p className="text-[#4e7397] text-sm font-normal leading-normal">
                                    {formatDate(exp.start_date)} - {formatDate(exp.end_date)}
                                </p>
                                {exp.description && (
                                    <p className="text-sm text-[#0e141b] leading-normal mt-1">{exp.description}</p>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

const SectionTitle: React.FC<{ title: string; description?: string }> = ({ title, description }) => (
    <div className="flex flex-wrap justify-between gap-3 p-4">
        <div className="flex min-w-72 flex-col gap-3">
            <p className="text-[32px] font-bold leading-tight">{title}</p>
            {description && <p className="text-[#4e7397] text-sm font-normal leading-normal">{description}</p>}
        </div>
    </div>
);

export default ExperiencePage;
