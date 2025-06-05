import React from 'react';

const Hero: React.FC = () => {
    return (
        <div className="@container">
            <div className="@[480px]:p-4">
                <div
                    className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-start justify-end px-4 pb-10 @[480px]:px-10"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url('https://cdn.usegalileo.ai/sdxl10/5fbc8e03-bd63-4d84-b1a9-828c3a7f388f.png')",
                    }}
                >
                    <div className="flex flex-col gap-2 text-left">
                        <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl">
                            Hi, I'm Alex
                        </h1>
                        <h2 className="text-white text-sm @[480px]:text-base font-normal leading-normal">
                            I'm a full-stack developer with a passion for building beautiful and functional web applications.
                        </h2>
                    </div>
                    <button className="flex h-10 min-w-[84px] items-center justify-center rounded-xl bg-[#1980e6] px-4 text-sm font-bold text-slate-50 tracking-[0.015em] @[480px]:h-12 @[480px]:px-5 @[480px]:text-base">
                        <span className="truncate">Download Resume</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hero;
