import db from '@/utils/db';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const updateSchema = z.object({
  name: z.string().optional(),
  institute_name: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  institute_address: z.string().optional(),
});

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: strId } = await params;
  const id = Number(strId);
  if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  const data = await req.json();
  const parse = updateSchema.safeParse(data);
  if (!parse.success) return NextResponse.json({ error: parse.error.errors }, { status: 400 });

  const updated = await db.education.update(id, parse.data);
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: strId } = await params;
  const id = Number(strId);
  if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  await db.education.delete(id);
  return NextResponse.json(null, { status: 204 });
}
