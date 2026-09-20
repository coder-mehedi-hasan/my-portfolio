"use client";
import { downloadResume } from '@/utils/helpers';
import React from 'react';

const Hero: React.FC<{ setting: setting }> = ({ setting }) => {

    return (
        <div className="px-4 pb-10 pt-5 md:px-0 md:pb-14 md:pt-8">
            <div
                className="flex min-h-[500px] flex-col items-start justify-end gap-7 rounded-2xl bg-cover bg-center bg-no-repeat px-6 pb-9 shadow-[0_1px_0_rgba(0,0,0,.04)] md:min-h-[540px] md:px-12 md:pb-12"
                style={{
                    backgroundImage:
                        // "linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url('https://cdn.usegalileo.ai/sdxl10/5fbc8e03-bd63-4d84-b1a9-828c3a7f388f.png')",
                        `linear-gradient(rgba(0, 0, 0, 0.08) 20%, rgba(0, 0, 0, 0.68) 100%), url(${setting.hero_img})`,
                }}
            >
                <div className="flex max-w-[680px] flex-col gap-3 text-left">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/75">Full-stack developer</p>
                    <h1 className="text-4xl font-black leading-[1.02] tracking-[-0.045em] text-white md:text-6xl">
                        {setting?.hero_title}
                    </h1>
                    <h2 className="max-w-[620px] text-sm font-normal leading-6 text-white/85 md:text-base">
                        {setting?.hero_desc}
                    </h2>
                </div>
                <button onClick={() => {
                    downloadResume('/resume-mehedi.pdf')
                }} className="flex h-11 min-w-[84px] cursor-pointer items-center justify-center rounded-full bg-white px-5 text-sm font-bold tracking-[0.015em] text-[#111211] transition hover:bg-[#ededeb] md:h-12 md:px-6">
                    <span className="truncate">Download Resume</span>
                </button>
            </div>
        </div>
    );
};

export default Hero;
