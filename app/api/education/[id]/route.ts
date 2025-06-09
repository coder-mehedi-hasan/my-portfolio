import db from '@/utils/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const updateSchema = z.object({
  name: z.string().optional(),
  institute_name: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  institute_address: z.string().optional(),
});

export async function PUT(req: Request, { params }: any) {
  const id = parseInt(params.id);
  const data = await req.json();
  const parse = updateSchema.safeParse(data);
  if (!parse.success) return NextResponse.json({ error: parse.error.errors }, { status: 400 });
  const updated = await db.education.update(id, parse.data);
  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: any) {
  const id = parseInt(params.id);
  await db.education.delete(id);
  return new Response(null, { status: 204 });
}
