"use client";
import { downloadResume } from '@/utils/helpers';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

const Header: React.FC = () => {
    const path = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <header className="border-b border-solid border-b-[#e7e8e5] bg-white/95 px-4 py-4 backdrop-blur md:px-8">
          <div className="mx-auto flex max-w-[1120px] items-center justify-between whitespace-nowrap">
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
            <div className="hidden flex-1 justify-end gap-8 md:flex">
                <nav className="flex items-center gap-8 text-sm font-medium text-[#4f5753] [&_a]:transition-colors [&_a:hover]:text-black">
                    <Link href="/about">About</Link>
                    <Link href={path === "/" ? "#experience" : "/experience"}>Experience</Link>
                    <Link href={path === "/" ? "#projects" : "/projects"}>Projects</Link>
                    <Link href={path === "/" ? "#skills" : "/skills"}>Skills</Link>
                    {/* <Link href="/testimonials">Testimonials</Link> */}
                    <Link href="/blogs">Blogs</Link>
                    <Link href="/contact">Contact</Link>
                </nav>
                <button
                    onClick={() => downloadResume('/resume-mehedi.pdf')}
                    className="flex h-10 min-w-[88px] cursor-pointer items-center justify-center rounded-full bg-[#111211] px-5 text-sm font-bold tracking-[0.015em] text-white transition hover:bg-[#303330]">
                    <span className="truncate">Resume</span>
                </button>
            </div>
            <button type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)} className="flex size-10 items-center justify-center rounded-xl border border-[#e7edf3] text-xl md:hidden">
              {menuOpen ? '×' : '☰'}
            </button>
          </div>
          {menuOpen && (
            <nav className="mt-3 flex flex-col gap-1 border-t border-[#e7edf3] pt-3 text-sm font-medium md:hidden">
              <Link onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 hover:bg-slate-50" href="/about">About</Link>
              <Link onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 hover:bg-slate-50" href="/experience">Experience</Link>
              <Link onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 hover:bg-slate-50" href="/projects">Projects</Link>
              <Link onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 hover:bg-slate-50" href="/skills">Skills</Link>
              <Link onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 hover:bg-slate-50" href="/blogs">Blogs</Link>
              <Link onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 hover:bg-slate-50" href="/contact">Contact</Link>
              <a href="/resume-mehedi.pdf" target="_blank" rel="noreferrer" className="mt-2 rounded-xl bg-[#111211] px-4 py-3 text-center font-bold text-white">Resume</a>
            </nav>
          )}
        </header>
    );
};

export default Header;
