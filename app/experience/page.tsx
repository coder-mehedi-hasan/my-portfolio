import PageIntro from '@/components/site/PageIntro';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllExperiences } from '@/utils/content';
export const metadata: Metadata = {
    title: 'Experience',
    description:
        'Professional work experience of Md Mehedi Hasan, a full-stack developer specializing in front-end and back-end development.',
    alternates: {
        canonical: '/experience',
    },
};

const date = (value?: string) => value ? new Date(value).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' }) : 'Present';
export default function ExperiencePage() {
 return <main className="page-shell"><PageIntro eyebrow="The journey" title="Experience." description="The teams I’ve worked with and the products I’ve helped build, across frontend, backend, and mobile development." /><div className="editorial-list">{getAllExperiences().map(exp => <Link className="editorial-row" key={exp.slug} href={`/experiences/${exp.slug}`}><p className="row-meta">{date(exp.start_date)} — {date(exp.end_date)}</p><div><h2>{exp.company_name}</h2><p className="mt-2">{exp.designation}</p><p className="row-meta mt-2">{[exp.location, exp.job_type].filter(Boolean).join(' · ')}</p>{exp.description && <p className="mt-4">{exp.description}</p>}</div><span aria-hidden="true">↗</span></Link>)}</div></main>;
}
