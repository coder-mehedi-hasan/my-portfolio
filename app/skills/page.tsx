import PageIntro from '@/components/site/PageIntro';
import type { Metadata } from 'next';
import { getAllSkills } from '@/utils/content';
export const metadata: Metadata = {
    title: 'Skills',
    description:
        'Technical skills of Md Mehedi Hasan including frontend development, backend development, databases, devops infrastructure and more.',
    alternates: {
        canonical: '/skills',
    },
};

export default function SkillsPage() {
 return <main className="page-shell"><PageIntro eyebrow="Capabilities" title="Tools of the trade." description="From the interface to the infrastructure, these are the technologies I use to build and ship software." /><div className="skills-grid">{getAllSkills().map((skill, i) => <section key={skill.slug} className="skill-entry"><p className="eyebrow">{String(i + 1).padStart(2, '0')}</p><h2>{skill.title}</h2><p>{skill.sub_title}</p>{skill.description && <p>{skill.description}</p>}</section>)}</div></main>;
}
