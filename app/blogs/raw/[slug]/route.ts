import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const BLOGS_DIR = path.join(process.cwd(), 'content', 'blogs');

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const filePath = path.join(BLOGS_DIR, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
        return new NextResponse('Not Found', { status: 404 });
    }

    const content = fs.readFileSync(filePath, 'utf8');

    return new NextResponse(content, {
        headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
        },
    });
}
