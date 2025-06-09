import db, { experienceSchema } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET() {
    const experience = await db.experience.getAll();
    return NextResponse.json(experience);
}

export async function POST(req: Request) {
    const body = await req.json();
    const parse = experienceSchema.safeParse(body);
    if (!parse.success) return NextResponse.json({ error: parse.error.errors }, { status: 400 });

    const exp = await db.experience.create(parse.data);
    return NextResponse.json(exp, { status: 201 });
}
