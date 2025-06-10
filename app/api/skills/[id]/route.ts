import db from '@/utils/db';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const skillSchema2 = z.object({
    is_home_page: z.boolean().optional(),
    title: z.string().min(1),
    sub_title: z.string().optional(),
    description: z.string().optional(),
    icon: z.string().optional(),
    sort_index: z.number().optional(),
});

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id: strId } = await params;
    const id = Number(strId);
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

    const body = await req.json();
    const parse = skillSchema2.safeParse(body);
    if (!parse.success) {
        return NextResponse.json({ error: parse.error.errors }, { status: 400 });
    }

    const updated = await db.skill.update(id, parse.data);
    return NextResponse.json(updated);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id: strId } = await params;
    const id = Number(strId);
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

    await db.skill.delete(id);
    return new Response(null, { status: 204 });
}
