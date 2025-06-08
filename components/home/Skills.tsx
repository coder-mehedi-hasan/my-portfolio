'use client';

import React from 'react';

const skills = [
    { name: 'Node.js', tools: 'Express, NestJS', icon: '📦' },
    { name: 'React', tools: 'Hooks, Redux, Context', icon: '🧠' },
    { name: 'Python', tools: 'Flask, Django', icon: '🐍' },
    { name: 'Java', tools: 'Spring', icon: '☕' }
];

const Skills: React.FC = () => {
    return (
        <section className="">
            <h2
                id="skills"
                className="text-[#0e141b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5"
            >
                Technical Skills
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 px-4 pb-10">
                {skills.map((skill, idx) => (
                    <div
                        key={idx}
                        className="border rounded-xl p-4 flex flex-col gap-2 shadow-sm"
                    >
                        <div className="flex items-center gap-2 text-[#0e141b]">
                            <span className="text-xl">{skill.icon}</span>
                            <p className="text-base font-medium leading-normal">{skill.name}</p>
                        </div>
                        {skill.tools && (
                            <p className="text-sm text-[#4e7397] leading-normal">{skill.tools}</p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
