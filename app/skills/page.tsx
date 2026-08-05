import React from 'react';
import DynamicFAIcon from '@/components/DynamicFAIcon';
import { getAllSkills } from '@/utils/content';

const SkillsPage: React.FC = () => {
    const skills = getAllSkills();

    return (
        <div className="min-h-screen bg-slate-50 font-body">
            <div className="max-w-5xl mx-auto px-4 py-10">
                <SectionTitle title="Technical Skills" />
                <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 mt-6">
                    {skills.map((skill) => (
                        <div key={skill.slug} className="border rounded-xl p-4 flex flex-col gap-1">
                            <div className="text-[#0e141b]">
                                <div className="text-xl">
                                    <DynamicFAIcon icon={`${skill.icon ?? ''} fa-lg`} />
                                </div>
                                <p className="text-lg font-semibold">{skill.title}</p>
                            </div>
                            {skill.sub_title && (
                                <p className="text-sm text-[#4e7397] leading-tight">{skill.sub_title}</p>
                            )}
                            {skill.description && (
                                <p className="text-sm text-[#4e7397] leading-tight">{skill.description}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const SectionTitle: React.FC<{ title: string; description?: string }> = ({ title, description }) => (
    <div className="flex flex-wrap justify-between gap-3 p-4 text-[#0e141b] ">
        <div className="flex min-w-72 flex-col gap-3">
            <p className="text-[32px] font-bold leading-tight">{title}</p>
            {description && <p className="text-[#4e7397] text-sm font-normal leading-normal">{description}</p>}
        </div>
    </div>
);

export default SkillsPage;
