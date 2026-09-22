import Link from 'next/link';
import PageIntro from '@/components/site/PageIntro';
import type { Metadata } from 'next';
import { getSkillGroups } from '@/utils/content';

export const metadata: Metadata = {
  title: 'Skills',
  description: 'Explore my skills, grouped by category, with individual pages for notes and practical lessons.',
  alternates: { canonical: '/skills' },
};

export default function SkillsPage() {
  const groups = getSkillGroups();
  return (
    <main className="page-shell">
      <PageIntro eyebrow="Capabilities" title="Tools of the trade." description="The technologies I work with, organized by category. Explore each skill for a closer look." />
      {groups.map(({ category, skills }) => (
        <section className="split-section" key={category}>
          <h2>{category}</h2>
          <div className="skill-directory">
            {skills.map(skill => (
              <Link key={skill.slug} href={`/skills/${skill.slug}`} className="skill-link">
                <div>
                  <h3>{skill.title}</h3>
                  <p>{skill.sub_title}</p>
                </div>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
