import db from '@/utils/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const projectUpdateSchema = z.object({
    is_featured: z.boolean().optional(),
    title: z.string().min(1),
    sub_title: z.string().optional(),
    description: z.string().optional(),
    icon: z.string().optional(),
});

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

    const body = await request.json();
    const parse = projectUpdateSchema.safeParse(body);
    if (!parse.success) {
        return NextResponse.json({ error: parse.error.errors }, { status: 400 });
    }

    const updated = await db.project.update(id, body);
    return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

    await db.project.delete(id);
    return new Response(null, { status: 204 });
}
