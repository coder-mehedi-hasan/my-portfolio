import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const skillSchema = z.object({
  is_home_page: z.boolean().optional(),
  title: z.string().min(1),
  sub_title: z.string().optional(),
  description: z.string().optional(),
  icon: z.string().optional(),
});

export async function GET() {
  const skills = await prisma.skill.findMany();
  return NextResponse.json(skills);
}

export async function POST(request: Request) {
  const body = await request.json();
  const parse = skillSchema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json({ error: parse.error.errors }, { status: 400 });
  }
  const skill = await prisma.skill.create({ data: parse.data });
  return NextResponse.json(skill, { status: 201 });
}