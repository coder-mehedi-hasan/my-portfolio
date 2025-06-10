'use client';

import React from 'react';
import DynamicFAIcon from '../DynamicFAIcon';

const Skills: React.FC<{ skills?: Skill[] }> = ({ skills }) => {
    return (
        <section>
            <h2
                id="skills"
                className="text-[#0e141b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5"
            >
                Technical Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 pb-10">
                {skills?.map((skill, idx) => (
                    <div
                        key={idx}
                        className="rounded-xl p-4 flex flex-col gap-2 shadow-sm border"
                        style={{ borderColor: '#e7edf3' }}
                    >
                        <div className="flex items-center gap-2 text-[#0e141b]">
                            <span className="text-xl">
                                <DynamicFAIcon icon={`${skill?.icon ?? ''} fa-lg`} />
                            </span>
                            <p className="text-base font-medium leading-normal">{skill?.title}</p>
                        </div>
                        {skill?.sub_title && (
                            <p className="text-sm text-[#4e7397] leading-normal">{skill.sub_title}</p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
