import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllSkills, getSkillBySlug } from '@/utils/content';

export function generateStaticParams() {
  return getAllSkills().map(skill => ({ slug: skill.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const skill = getSkillBySlug(slug);
  if (!skill) return {};
  return {
    title: skill.title,
    description: skill.description || skill.sub_title,
    alternates: { canonical: `/skills/${skill.slug}` },
    openGraph: {
      title: skill.title,
      description: skill.description || skill.sub_title,
      url: `/skills/${skill.slug}`,
      type: 'website',
    },
  };
}

export default async function SkillDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const skill = getSkillBySlug(slug);
  if (!skill) notFound();
  const related = getAllSkills().filter(item => item.category === skill.category && item.slug !== skill.slug).slice(0, 4);

  return (
    <main className="detail-page">
      <div className="detail-shell">
        <Link href="/skills" className="back-link">← All skills</Link>
        <h1 className="detail-title">{skill.title}</h1>
        <p className="detail-description">{skill.sub_title}</p>
        <div className="detail-meta"><span>{skill.category}</span></div>
        {skill.description && <p className="mb-8 leading-8 text-[#626660]">{skill.description}</p>}
        {skill.body.trim() ? (
          <article className="blog-content" dangerouslySetInnerHTML={{ __html: skill.content }} />
        ) : (
          <p className="text-sm leading-7 text-[#626660]">Notes and practical examples will be added here.</p>
        )}
        {related.length > 0 && (
          <section className="mt-12 border-t border-[#dedfd9] pt-8">
            <h2 className="mb-5 text-sm font-medium">More in {skill.category}</h2>
            <div className="flex flex-wrap gap-3">
              {related.map(item => <Link key={item.slug} href={`/skills/${item.slug}`} className="tag hover:underline">{item.title} ↗</Link>)}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
