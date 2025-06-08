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
      className="font-body relative flex size-full min-h-screen flex-col bg-slate-50 overflow-x-hidden bg"
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <Hero />
            <Section title="Experience" items={experienceItems} id="experience" href="/experiences" btnText="View All Experiences" viewAllBtnPreview={false} />
            <Section title="Projects" items={projectItems} id={"projects"} href="/projects" btnText="View All Projects" viewAllBtnPreview={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
