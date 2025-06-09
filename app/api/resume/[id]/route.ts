import db from '@/utils/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const updateSchema = z.object({
    url: z.string().url().optional(),
    is_active: z.boolean().optional(),
});

export async function PUT(req: Request, { params }: any) {
    const id = parseInt(params.id);
    const data = await req.json();
    const parse = updateSchema.safeParse(data);
    if (!parse.success) return NextResponse.json({ error: parse.error.errors }, { status: 400 });
    const updated = await db.resume.update(id, parse.data);
    return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: any) {
    const id = parseInt(params.id);
    await db.resume.delete(id);
    return new Response(null, { status: 204 });
}
