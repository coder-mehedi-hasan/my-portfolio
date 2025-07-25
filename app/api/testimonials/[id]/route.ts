import db from '@/utils/db';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const updateSchema = z.object({
    author_name: z.string().optional(),
    author_designation: z.string().optional(),
    author_company_name: z.string().optional(),
    author_image: z.string().optional(),
    feedback: z.string().optional(),
});

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id: strId } = await params;
    const id = Number(strId);
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

    const data = await req.json();
    const parse = updateSchema.safeParse(data);
    if (!parse.success) return NextResponse.json({ error: parse.error.errors }, { status: 400 });

    const updated = await db.testimonial.update(id, parse.data);
    return NextResponse.json(updated);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id: strId } = await params;
    const id = Number(strId);
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

    await db.testimonial.delete(id);
    return new Response(null, { status: 204 });
}
