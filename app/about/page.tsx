import PageIntro from '@/components/site/PageIntro';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllExperiences, getAllSkills } from '@/utils/content';
export const metadata: Metadata = {
    title: 'About',
    description:
        'Learn more about Md Mehedi Hasan, a full-stack developer building web and mobile products across frontend, backend and infrastructure.',
    alternates: {
        canonical: '/about',
    },
};

export default function AboutPage() {
 return <main className="page-shell"><PageIntro eyebrow="A little about me" title="Developer. Builder.
Always learning." /><div className="about-grid"><div className="about-copy"><p>I’m Mehedi Hasan, a full-stack developer working across frontend experiences, backend services, databases, and delivery infrastructure.</p><p>I enjoy turning complex workflows into clear, maintainable products and taking ownership from requirements through production.</p><p>My work spans web and mobile applications, from patient-facing interfaces to the APIs and systems behind them.</p><Link className="text-link" href="/contact">Let’s talk ↗</Link></div><Image src="/md-mehedi-hasan-portfolio.jpg" alt="Mehedi Hasan" width={600} height={600} className="about-portrait" priority /></div><section className="split-section"><div><h2>Where I’ve worked</h2><Link href="/experience" className="text-link">Full timeline ↗</Link></div><div>{getAllExperiences().map(exp => <Link key={exp.slug} className="compact-row" href={`/experiences/${exp.slug}`}><div><h3>{exp.company_name}</h3><p>{exp.designation}</p></div><span aria-hidden="true">↗</span></Link>)}</div></section><section className="split-section"><div><h2>What I work with</h2><Link className="text-link" href="/skills">Explore skills ↗</Link></div><div className="flex flex-wrap content-start gap-2">{getAllSkills().map(skill => <span key={skill.slug} className="tag">{skill.title}</span>)}</div></section></main>;
}
