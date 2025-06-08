import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma2 = new PrismaClient();

const skillSchema2 = z.object({
    is_home_page: z.boolean().optional(),
    title: z.string().min(1),
    sub_title: z.string().optional(),
    description: z.string().optional(),
    icon: z.string().optional(),
});

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

    const body = await request.json();
    const parse = skillSchema2.safeParse(body);
    if (!parse.success) {
        return NextResponse.json({ error: parse.error.errors }, { status: 400 });
    }

    const updated = await prisma2.skill.update({ where: { id }, data: parse.data });
    return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

    await prisma2.skill.delete({ where: { id } });
    return new Response(null, { status: 204 });
}
