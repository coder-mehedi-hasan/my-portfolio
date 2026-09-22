import Link from 'next/link';
import type { ProjectItem } from '@/utils/content';

export default function ProjectCards({ projects }: { projects: ProjectItem[] }) {
  return <div className="project-grid">{projects.map((project, index) => <Link key={project.slug} href={`/projects/${project.slug}`} className="project-card"><div className="project-caption"><span>{String(index + 1).padStart(2, '0')} / {project.sub_title}</span><span aria-hidden="true">↗</span></div><h2>{project.title}</h2><p>{project.description || project.sub_title}</p><div className="project-tools">{project.tools?.join(' / ')}</div></Link>)}</div>;
}
