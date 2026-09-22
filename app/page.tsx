import Link from 'next/link';
import ProjectCards from '@/components/site/ProjectCards';
import Hero from '@/components/home/Hero';
import { setting } from '@/utils/data';
import { getFeaturedProjects, getFeaturedSkillGroups, getAllExperiences } from '@/utils/content';

function formatDate(value?: string | null) {
  return value ? new Date(value).toLocaleString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' }) : 'Present';
}

export default function Home() {
  const projects = getFeaturedProjects(2);
  const experiences = getAllExperiences();
  const skillHighlights = getFeaturedSkillGroups();

  return (
    <main className="mx-auto max-w-[1080px] px-6 sm:px-10">
      <Hero setting={setting} />
      <section id="projects" className="scroll-mt-28 border-t border-[#dedfd9] pb-20 pt-8 sm:pb-24">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-sm font-medium text-[#626660]">Selected work</h2>
          <Link href="/projects" className="text-sm text-[#626660] underline-offset-4 hover:text-[#202220] hover:underline">All projects <span aria-hidden="true">↗</span></Link>
        </div>
        <ProjectCards projects={projects} />
      </section>

      <section id="experience" className="grid scroll-mt-28 gap-7 border-t border-[#dedfd9] py-10 sm:grid-cols-[220px_1fr] sm:py-12">
        <div><h2 className="text-lg font-medium tracking-tight">Experience</h2><Link href="/experience" className="mt-3 inline-block text-sm text-[#70746f] hover:underline">Full timeline <span aria-hidden="true">↗</span></Link></div>
        <div>{experiences.map((exp) => <Link key={exp.slug} href={`/experiences/${exp.slug}`} className="group flex flex-col gap-2 border-b border-[#e5e6df] py-6 first:pt-0 last:border-0 last:pb-0 md:flex-row md:justify-between md:gap-5"><div><h3 className="text-base font-medium group-hover:underline underline-offset-4">{exp.company_name}</h3><p className="mt-1 text-sm leading-6 text-[#626660]">{exp.designation}</p></div><p className="shrink-0 text-xs leading-6 text-[#70746f]">{formatDate(exp.start_date)} — {formatDate(exp.end_date)}</p></Link>)}</div>
      </section>

      <section id="skills" className="grid scroll-mt-28 gap-7 border-t border-[#dedfd9] py-10 sm:grid-cols-[220px_1fr] sm:py-12">
        <div>
          <h2 className="text-lg font-medium tracking-tight">Tools of the trade</h2>
          <Link href="/skills" className="mt-3 inline-block text-sm text-[#626660] underline-offset-4 hover:underline">
            All skills <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <dl>
          {skillHighlights.map(({ category, skills }) => (
            <div key={category} className="grid gap-2 border-b border-[#e5e6df] py-5 first:pt-0 last:border-0 last:pb-0 lg:grid-cols-[160px_1fr] lg:gap-6">
              <dt className="text-sm font-medium leading-7">{category}</dt>
              <dd className="text-sm leading-7 text-[#626660]">{skills.map((skill, index) => (
                <span key={skill.slug}>
                  {index > 0 && ', '}
                  <Link href={`/skills/${skill.slug}`} className="underline-offset-4 hover:underline">{skill.title}</Link>
                </span>
              ))}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-8 border-t border-[#dedfd9] py-14 sm:py-20">
        <p className="mb-3 text-sm text-[#70746f]">Have something in mind?</p>
        <Link href="/contact" className="inline-flex items-center gap-5 text-3xl font-medium tracking-[-0.04em] underline-offset-8 hover:underline sm:text-4xl">Let’s build something useful. <span aria-hidden="true">↗</span></Link>
      </section>

    </main>
  );
}
