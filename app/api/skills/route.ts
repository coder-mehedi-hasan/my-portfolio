import db, { skillSchema } from "@/utils/db";
import { NextResponse } from 'next/server';

export async function GET() {

  const skills = await db.skill.getAll();
  return NextResponse.json(skills);
}

export async function POST(request: Request) {
  const body = await request.json();
  const parse = skillSchema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json({ error: parse.error.errors }, { status: 400 });
  }
  const skill = await db.skill.create(parse.data);
  return NextResponse.json(skill, { status: 201 });
}