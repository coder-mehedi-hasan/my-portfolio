import db, { resumeSchema } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET() {
    const items = await db.resume.getAll();
    return NextResponse.json(items);
}

export async function POST(req: Request) {
    const data = await req.json();
    const parse = resumeSchema.safeParse(data);
    if (!parse.success) return NextResponse.json({ error: parse.error.errors }, { status: 400 });
    const item = await db.resume.create(parse.data);
    return NextResponse.json(item, { status: 201 });
}
