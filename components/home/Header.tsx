"use client";
import constant from '@/utils/constant';
import { downloadResume } from '@/utils/helpers';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Header: React.FC = () => {
    const path = usePathname();
    return (
        <header className={`items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7edf3] px-10 py-3 ${path.startsWith("/admin") ? "hidden" : "flex"}`}>
            <div className="flex items-center gap-4 text-[#0e141b]">
                <div className="size-4">
                    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                            fill="currentColor"
                        />
                    </svg>
                </div>
                <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]"><Link href={"/"}>Mehedi Hasan</Link></h2>
            </div>
            <div className="flex flex-1 justify-end gap-8">
                <nav className="flex items-center gap-9 text-sm font-medium text-[#0e141b]">
                    {/* <Link href="/about">About</Link> */}
                    <Link href={path === "/" ? "#experience" : "/experience"}>Experience</Link>
                    <Link href={path === "/" ? "#projects" : "/projects"}>Projects</Link>
                    <Link href={path === "/" ? "#skills" : "/skills"}>Skills</Link>
                    {/* <Link href="/testimonials">Testimonials</Link> */}
                    {/* <Link href="/blogs">Blogs</Link> */}
                    <Link href="/contact">Contact</Link>
                </nav>
                <button
                    onClick={() => {
                        if (!constant.baseUrl) return;
                        downloadResume(`${constant.baseUrl}/resume-mehedi.pdf`)
                    }}
                    className="cursor-pointer flex h-10 min-w-[84px] items-center justify-center rounded-xl bg-[#1980e6] px-4 text-sm font-bold text-slate-50 tracking-[0.015em]">
                    <span className="truncate">Resume</span>
                </button>
            </div>
        </header>
    );
};

export default Header;
