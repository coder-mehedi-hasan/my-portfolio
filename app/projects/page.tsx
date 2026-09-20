import Link from 'next/link';
import React from 'react';
import type { Metadata } from 'next';
import { getAllProjects } from '@/utils/content';

export const metadata: Metadata = {
    title: 'Projects',
    description:
        'Explore the projects built by Md Mehedi Hasan, a full-stack developer. From e-commerce platforms to healthcare systems and elegant websites.',
    alternates: {
        canonical: '/projects',
    },
};

const Project: React.FC = () => {
    const projects = getAllProjects();

    return (
        <div className="min-h-screen bg-[#fafaf9] text-[#111211] font-body">
            <div className="max-w-5xl mx-auto px-4 py-10">
                <SectionTitle title="Projects" description="A selection of projects I've worked on." />

                <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
                    {projects.map((project) => (
                        <Link
                            key={project.slug}
                            href={`/projects/${project.slug}`}
                            className="flex flex-col gap-3 pb-3 hover:opacity-80 transition"
                        >
                            <div
                                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                                style={{
                                    backgroundImage: project.image
                                        ? `url('${project.image}')`
                                        : `linear-gradient(135deg, #e7edf3 0%, #c3d2e0 100%)`,
                                }}
                            ></div>
                            <div>
                                <p className="text-base font-medium leading-normal">{project.title}</p>
                                {project.sub_title && (
                                    <p className="text-[#4e7397] text-sm font-normal leading-normal">{project.sub_title}</p>
                                )}
                                {project.date && (
                                    <p className="text-[#4e7397] text-sm font-normal leading-normal">
                                        {new Date(project.date).getFullYear()}
                                    </p>
                                )}
                                {project.tools && project.tools.length > 0 && (
                                    <p className="text-[#4e7397] text-sm font-normal leading-normal">
                                        {project.tools.join(', ')}
                                    </p>
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

export default Project;
