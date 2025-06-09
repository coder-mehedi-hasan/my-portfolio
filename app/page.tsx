import Skills from '@/components/home/Skills';
import Hero from '../components/home/Hero';
import Section, { SectionItem } from '../components/home/Section';

// const experienceItems: SectionItem[] = [
//   { title: 'Software Engineer', location: 'San Francisco, CA', date: 'Jun 2020 - Present' },
//   { title: 'Product Designer', location: 'San Francisco, CA', date: 'Jun 2019 - Jun 2020' },
// ];

// const projectItems: SectionItem[] = [
//   { title: 'Giggle', date: 'Jul 2021' },
//   { title: 'Pickle', date: 'Oct 2019' },
// ];

const baseUrl = "http://localhost:3000"

export default async function Home() {
  const res = await fetch(`${baseUrl}/api`);
  const data = await res.json() as PortfolioData;

  return (
    <div
      className="font-body relative flex size-full min-h-screen flex-col bg-slate-50 overflow-x-hidden bg"
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <Hero setting={data.setting} />
            <Section title="Experience" items={data?.experience?.map((exp: Experience) => ({
              ...exp,
              title: exp?.designation,
              date: "Jun 2020 - Present",
            }))} id="experience" href="/experiences" btnText="View All Experiences" viewAllBtnPreview={false} />
            <Section title="Projects" items={data.projects.map((project: Project) => ({
              ...project,
              date: "Oct 2019"
            }))} id={"projects"} href="/projects" btnText="View All Projects" viewAllBtnPreview={true} />
            <Skills skills={data.skills} />
          </div>
        </div>
      </div>
    </div>
  );
}
