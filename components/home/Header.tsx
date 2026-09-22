'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const links = [
  { href: '/projects', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/blogs', label: 'Writing' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const path = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="border-b border-[#e8e9e5] bg-[#fafaf9]/95 px-6 backdrop-blur-sm sm:px-10">
      <div className="mx-auto flex h-20 max-w-[1000px] items-center justify-between">
        <Link href="/" onClick={() => setMenuOpen(false)} className="text-sm font-semibold tracking-[-0.03em] text-[#252724]">mehedi<span className="text-[#858981]">.</span></Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-8 sm:flex">
          {links.map(({ href, label }) => <Link key={href} href={href} aria-current={path === href ? 'page' : undefined} className={`text-sm transition-colors hover:text-[#202220] ${(path.startsWith(href) || (href === '/about' && ['/experience', '/skills', '/testimonials'].some(section => path.startsWith(section)))) ? 'font-medium text-[#202220]' : 'text-[#70746f]'}`}>{label}</Link>)}
        </nav>
        <button type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-navigation" className="rounded-full border border-[#dedfd9] px-4 py-2 text-sm sm:hidden">{menuOpen ? 'Close' : 'Menu'}</button>
      </div>
      {menuOpen && <nav id="mobile-navigation" aria-label="Mobile navigation" className="flex flex-col gap-1 border-t border-[#e8e9e5] py-3 sm:hidden">{links.map(({ href, label }) => <Link key={href} href={href} onClick={() => setMenuOpen(false)} className="rounded-md px-2 py-3 text-sm text-[#626660] hover:bg-[#efefeb]">{label}</Link>)}</nav>}
    </header>
  );
}
