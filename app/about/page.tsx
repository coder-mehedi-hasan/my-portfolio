import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import DynamicFAIcon from '@/components/DynamicFAIcon';
import { getAllExperiences, getAllSkills } from '@/utils/content';

export const metadata: Metadata = {
    title: 'About',
    description:
        'Learn more about Md Mehedi Hasan, a full-stack developer building web and mobile products across frontend, backend and infrastructure.',
    alternates: {
        canonical: '/about',
    },
};

const About: React.FC = () => {
    const experiences = getAllExperiences();
    const skills = getAllSkills();
    return (
        <div className="min-h-screen bg-[#fafaf9] text-[#111211]">
            <div className="max-w-4xl mx-auto px-4 py-10">
                <div
                    className="w-full min-h-80 rounded-xl bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage:
                            "url('/me.jpg')",
                    }}
                />

                <h1 className="text-4xl font-bold text-center pt-6 pb-3">Mehedi Hasan</h1>
                <p className="text-[#4e7397] text-sm text-center pb-3">Full-stack Developer</p>
                <p className="mx-auto max-w-[65ch] pb-6 text-base leading-7 text-[#4f5753] sm:text-lg sm:leading-8">
                    I am a full-stack developer working across frontend experiences, backend services, databases, and delivery infrastructure. I enjoy turning complex workflows into clear,
                    maintainable products and taking ownership from requirements through production.
                </p>

                <SectionTitle title="Experience" />
                {experiences.map((experience) => (
                    <ExperienceItem
                        key={experience.slug}
                        href={`/experiences/${experience.slug}`}
                        role={`${experience.designation}, ${experience.company_name}`}
                        duration={`${new Date(experience.start_date ?? '').getFullYear()} - ${experience.end_date ? new Date(experience.end_date).getFullYear() : 'Present'}`}
                    />
                ))}

                <SectionTitle title="Skills" />
                <div className="flex flex-wrap gap-3 p-3 pr-4">
                    {skills.map(skill => (
                        <span
                            key={skill.slug}
                            className="px-4 h-8 flex items-center rounded-xl bg-[#e7edf3] text-sm font-medium"
                        >
                            {skill.title}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
    <h2 className="text-[22px] font-bold tracking-tight pt-5 pb-3 px-4">{title}</h2>
);

const ExperienceItem: React.FC<{ role: string; duration: string; href: string }> = ({ role, duration, href }) => (
    <div className="flex items-center justify-between bg-slate-50 px-4 py-2 min-h-[72px]">
        <div className="flex items-center gap-4">
            <div className="size-12 bg-[#e7edf3] flex items-center justify-center rounded-lg">
                <DynamicFAIcon icon="fa-solid fa-briefcase" />
            </div>
            <div>
                <p className="text-base font-semibold leading-6">{role}</p>
                <p className="text-[#4e7397] text-sm leading-normal line-clamp-2">{duration}</p>
            </div>
        </div>
        <Link href={href} className="ml-3 shrink-0 text-sm font-semibold hover:underline" aria-label={`Details for ${role}`}>Details →</Link>
    </div>
);

export default About;
