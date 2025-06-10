import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import db from '@/utils/db';

const experienceUpdateSchema = z.object({
    is_home_page: z.boolean().optional(),
    designation: z.string().min(1).optional(),
    company_name: z.string().min(1).optional(),
    location: z.string().min(1).optional(),
    description: z.string().optional(),
    icon: z.string().optional(),
    start_date: z.string().optional(),
    end_date: z.string().optional(),
});

type RouteContext = {
    params: { id: string };
};


export async function PUT(req: NextRequest, context: RouteContext) {
    const id = parseInt(context.params.id);
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

    const body = await req.json();
    const parse = experienceUpdateSchema.safeParse(body);
    if (!parse.success) return NextResponse.json({ error: parse.error.errors }, { status: 400 });

    const updated = await db.experience.update(id, parse.data);
    return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, context: RouteContext) {
    const id = parseInt(context.params.id);
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

    await db.experience.delete(id);
    return NextResponse.json(null, { status: 204 });
}
