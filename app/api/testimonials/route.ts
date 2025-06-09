import db, { testimonialSchema } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const items = await db.testimonial.getAll();
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const data = await req.json();
  const parse = testimonialSchema.safeParse(data);
  if (!parse.success) {
    return NextResponse.json({ error: parse.error.errors }, { status: 400 });
  }
  const item = await db.testimonial.create(parse.data);
  return NextResponse.json(item, { status: 201 });
}
