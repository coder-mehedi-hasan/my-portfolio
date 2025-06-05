import React from 'react';
import Header from '../components/home/Header';
import Hero from '../components/home/Hero';
import Section, { SectionItem } from '../components/home/Section';

const experienceItems: SectionItem[] = [
  { title: 'Software Engineer', location: 'San Francisco, CA', date: 'Jun 2020 - Present' },
  { title: 'Product Designer', location: 'San Francisco, CA', date: 'Jun 2019 - Jun 2020' },
];

const projectItems: SectionItem[] = [
  { title: 'Giggle', date: 'Jul 2021' },
  { title: 'Pickle', date: 'Oct 2019' },
];

export default function Home() {
  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-slate-50 overflow-x-hidden bg"
      style={{ fontFamily: 'Inter, \"Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <Header />
            <Hero />
            <Section title="Experience" items={experienceItems} />
            <Section title="Projects" items={projectItems} />
            <div className="flex px-4 py-3 justify-end">
              <button className="flex h-12 min-w-[84px] items-center justify-center rounded-xl bg-[#e7edf3] px-5 text-base font-bold text-[#0e141b] tracking-[0.015em]">
                <span className="truncate">View All Projects</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
