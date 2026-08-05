import Skills from '@/components/home/Skills';
import Hero from '../components/home/Hero';
import Section from '../components/home/Section';
import { setting } from '@/utils/data';
import { getAllSkills, getAllProjects, getAllExperiences } from '@/utils/content';

export default function Home() {
  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return 'Present';
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
  };

  const skills = getAllSkills();
  const projects = getAllProjects();
  const experiences = getAllExperiences();

  return (
    <div className="font-body relative flex size-full min-h-screen flex-col bg-slate-50 overflow-x-hidden bg">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <Hero setting={setting} />
            <Section
              title="Experience"
              items={experiences.map((exp) => {
                return {
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
              items={projects.map((project) => ({
                title: project.title,
                date: formatDate(project?.date),
                location: project?.sub_title
              }))}
              id={"projects"}
              href="/projects"
              btnText="View All Projects"
              viewAllBtnPreview={true}
            />
            <Skills skills={skills} />
          </div>
        </div>
      </div>
    </div>
  );
}