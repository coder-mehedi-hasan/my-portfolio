import fs from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { contentRoot, readPublishedMarkdown } from '@/lib/content/store.mjs';

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // The public starter template is intentional; no other underscore files are exposed.
  const content = slug === '_template'
    ? fs.readFileSync(path.join(contentRoot, 'blogs', '_template.md'), 'utf8')
    : readPublishedMarkdown('blogs', slug);
  if (content === null) return new NextResponse('Not Found', { status: 404 });
  return new NextResponse(content, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8', 'Cache-Control': 'public, max-age=0, must-revalidate' },
  });
}
