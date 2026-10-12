'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { profileLinks, socialProfiles } from '@/lib/profile';

const links = [
  { href: '/projects', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/blogs', label: 'Writing' },
];

export default function Header() {
  const path = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="border-b border-[#e8e9e5] bg-[#fafaf9]/95 px-6 backdrop-blur-sm sm:px-10">
      <div className="mx-auto flex h-20 max-w-[1000px] items-center justify-between">
        <Link href="/" onClick={() => setMenuOpen(false)} className="text-sm font-semibold tracking-[-0.03em] text-[#252724]">mehedi<span className="text-[#858981]">.</span></Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-6 md:flex">
          {links.map(({ href, label }) => <Link key={href} href={href} aria-current={path === href ? 'page' : undefined} className={`text-sm transition-colors hover:text-[#202220] ${(path.startsWith(href) || (href === '/about' && ['/experience', '/skills', '/testimonials'].some(section => path.startsWith(section)))) ? 'font-medium text-[#202220]' : 'text-[#70746f]'}`}>{label}</Link>)}
          <span className="h-4 w-px bg-[#dedfd9]" aria-hidden="true" />
          {socialProfiles.map(({ label, href }) => <a key={label} href={href} target="_blank" rel="noreferrer" className="text-sm text-[#70746f] transition-colors hover:text-[#202220]">{label} <span aria-hidden="true">↗</span></a>)}
          <Link href="/contact" aria-current={path === '/contact' ? 'page' : undefined} className="rounded-full bg-[#252724] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#444741]">Let’s talk <span aria-hidden="true">↗</span></Link>
        </nav>
        <button type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-navigation" className="rounded-full border border-[#dedfd9] px-4 py-2 text-sm md:hidden">{menuOpen ? 'Close' : 'Menu'}</button>
      </div>
      {menuOpen && <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t border-[#e8e9e5] py-4 md:hidden">
        <div className="flex flex-col gap-1">
          {links.map(({ href, label }) => <Link key={href} href={href} onClick={() => setMenuOpen(false)} className="rounded-md px-2 py-3 text-sm text-[#626660] hover:bg-[#efefeb]">{label}</Link>)}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[#e8e9e5] pt-4">
          {socialProfiles.map(({ label, href }) => <a key={label} href={href} target="_blank" rel="noreferrer" className="rounded-md border border-[#dedfd9] px-3 py-3 text-sm text-[#626660]">{label} <span aria-hidden="true">↗</span></a>)}
          <a href={profileLinks.email} className="rounded-md border border-[#dedfd9] px-3 py-3 text-sm text-[#626660]">Email <span aria-hidden="true">↗</span></a>
          <a href={profileLinks.resume} target="_blank" rel="noreferrer" className="rounded-md border border-[#dedfd9] px-3 py-3 text-sm text-[#626660]">Résumé <span aria-hidden="true">↗</span></a>
        </div>
        <Link href="/contact" onClick={() => setMenuOpen(false)} className="mt-4 flex items-center justify-between rounded-full bg-[#252724] px-5 py-3.5 text-sm font-medium text-white">Let’s talk <span aria-hidden="true">↗</span></Link>
      </nav>}
    </header>
  );
}
