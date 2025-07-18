"use client";
import constant from '@/utils/constant';
import { downloadResume } from '@/utils/helpers';
import React from 'react';

const Hero: React.FC<{ setting: setting }> = ({ setting }) => {

    return (
        <div className="p-4 md:p-10">
            <div
                className="flex min-h-[480px] flex-col gap-6 md:gap-8 md:rounded-xl items-start justify-end bg-cover bg-center bg-no-repeat px-4 pb-10 md:px-10"
                style={{
                    backgroundImage:
                        // "linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url('https://cdn.usegalileo.ai/sdxl10/5fbc8e03-bd63-4d84-b1a9-828c3a7f388f.png')",
                        `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url(${setting.hero_img})`,
                }}
            >
                <div className="flex flex-col gap-2 text-left">
                    <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-5xl">
                        {setting?.hero_title}
                    </h1>
                    <h2 className="text-white text-sm md:text-base font-normal leading-normal">
                        {setting?.hero_desc}
                    </h2>
                </div>
                <button onClick={() => {
                    if (!constant.baseUrl) return;
                    downloadResume(`${constant.baseUrl}/resume-mehedi.pdf`)
                }} className="flex h-10 min-w-[84px] items-center justify-center rounded-xl bg-[#1980e6] px-4 text-sm font-bold text-slate-50 tracking-[0.015em] md:h-12 md:px-5 md:text-base cursor-pointer">
                    <span className="truncate">Download Resume</span>
                </button>
            </div>
        </div>
    );
};

export default Hero;
