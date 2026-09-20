'use client';

import React from 'react';
import DynamicFAIcon from '../DynamicFAIcon';
import { SkillItem } from '@/utils/content';

const Skills: React.FC<{ skills?: SkillItem[] }> = ({ skills }) => {
    return (
        <section id="skills" className="scroll-mt-24 px-4 py-8 md:px-0 md:py-10">
            <h2
                className="pb-5 text-2xl font-bold leading-tight tracking-[-0.025em] text-[#111211] md:text-[28px]"
            >
                Technical Skills
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {skills?.map((skill, idx) => (
                    <div
                        key={idx}
                        className="flex min-h-36 flex-col gap-3 rounded-2xl border border-[#e3e5e2] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#c9cdca]"
                    >
                        <div className="flex items-center gap-2 text-[#0e141b]">
                            <span className="grid size-10 place-items-center rounded-xl bg-[#f0f1ef] text-lg">
                                <DynamicFAIcon icon={`${skill?.icon ?? ''} fa-lg`} />
                            </span>
                            <p className="text-base font-semibold leading-normal">{skill?.title}</p>
                        </div>
                        {skill?.sub_title && (
                            <p className="text-sm leading-6 text-[#66706b]">{skill.sub_title}</p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
