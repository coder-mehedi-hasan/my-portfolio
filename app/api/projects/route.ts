import db, { projectSchema } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET() {
    const projects = await db.project.getAll();
    return NextResponse.json(projects);
}

export async function POST(request: Request) {
    const body = await request.json();
    const parse = projectSchema.safeParse(body);
    if (!parse.success) {
        return NextResponse.json({ error: parse.error.errors }, { status: 400 });
    }
    const project = await db.project.create(parse.data);
    return NextResponse.json(project, { status: 201 });
}
