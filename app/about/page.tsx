import type { Metadata } from 'next';
import React from 'react';
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
                <p className="text-base text-center pb-3">
                    I am a full-stack developer working across frontend experiences, backend services, databases, and delivery infrastructure. I enjoy turning complex workflows into clear,
                    maintainable products and taking ownership from requirements through production.
                </p>

                <SectionTitle title="Experience" />
                {experiences.map((experience) => (
                    <ExperienceItem
                        key={experience.slug}
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

const ExperienceItem: React.FC<{ role: string; duration: string }> = ({ role, duration }) => (
    <div className="flex items-center justify-between bg-slate-50 px-4 py-2 min-h-[72px]">
        <div className="flex items-center gap-4">
            <div className="size-12 bg-[#e7edf3] flex items-center justify-center rounded-lg">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                >
                    <path d="M216,56H176V48a24..." />
                </svg>
            </div>
            <div>
                <p className="text-base font-medium leading-normal line-clamp-1">{role}</p>
                <p className="text-[#4e7397] text-sm leading-normal line-clamp-2">{duration}</p>
            </div>
        </div>
        <button className="text-base font-medium">Details</button>
    </div>
);

export default About;
