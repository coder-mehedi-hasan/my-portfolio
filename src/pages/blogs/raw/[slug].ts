import fs from 'node:fs';
import path from 'node:path';
import type { APIRoute } from 'astro';
import { getPublishedBlogs } from '../../../lib/content';

const contentRoot = path.join(process.cwd(), 'src', 'pages');
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function getStaticPaths() {
  const blogs = await getPublishedBlogs();
  return [
    ...blogs.map((blog) => ({ params: { slug: blog.id } })),
    // The public starter template is intentional; no other underscore files are exposed.
    { params: { slug: '_template' } },
  ];
}

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug ?? '';

  const file =
    slug === '_template'
      ? path.join(contentRoot, 'blogs', '_template.md')
      : slugPattern.test(slug)
        ? path.join(contentRoot, 'blogs', `${slug}.md`)
        : null;

  if (!file || !fs.existsSync(file)) {
    return new Response('Not Found', { status: 404 });
  }

  return new Response(fs.readFileSync(file, 'utf8'), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
      // Raw Markdown is a machine-readable mirror, never a search result.
      'X-Robots-Tag': 'noindex',
    },
  });
};
