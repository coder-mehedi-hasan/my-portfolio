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

export default async function Home() {
  let data: PortfolioData | null = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/api`, {
      cache: 'no-store',
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch API: ${res.status}`);
    }

    data = await res.json();
  } catch (err) {
    console.error("Error fetching portfolio data:", err);
    // fallback to avoid crash
    data = {
      setting: {},
      experience: [],
      projects: [],
      skills: []
    };
  }


  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return 'Present';
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="font-body relative flex size-full min-h-screen flex-col bg-slate-50 overflow-x-hidden bg">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <Hero setting={data?.setting} />
            <Section
              title="Experience"
              items={data?.experience?.map((exp: Experience) => {
                return {
                  ...exp,
                  title: exp?.designation,
                  date: `${formatDate(exp?.start_date)} - ${formatDate(exp?.end_date)}`,
                  location: `${exp.company_name}, ${exp.location}`
                }
              })}
              id="experience"
              href="/experience"
              btnText="View All Experience"
              viewAllBtnPreview={true}
            />
            <Section
              title="Projects"
              items={data?.projects.map((project: Project) => ({
                ...project,
                date: formatDate(project?.date),
              }))}
              id={"projects"}
              href="/projects"
              btnText="View All Projects"
              viewAllBtnPreview={true}
            />
            <Skills skills={data?.skills} />
          </div>
        </div>
      </div>
    </div>
  );
}

