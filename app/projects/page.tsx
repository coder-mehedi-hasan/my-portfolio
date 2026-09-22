import PageIntro from '@/components/site/PageIntro';
import type { Metadata } from 'next';
import ProjectCards from '@/components/site/ProjectCards';
import { getAllProjects } from '@/utils/content';
export const metadata: Metadata = {
    title: 'Projects',
    description:
        'Explore the projects built by Md Mehedi Hasan, a full-stack developer. From e-commerce platforms to healthcare systems and elegant websites.',
    alternates: {
        canonical: '/projects',
    },
};

export default function ProjectsPage() {
 return <main className="page-shell"><PageIntro eyebrow="Portfolio" title="Selected work." description="Web and mobile products I’ve helped bring to life. A closer look at the work, the decisions, and what I learned along the way." /><ProjectCards projects={getAllProjects()} /></main>;
}
