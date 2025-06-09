import { Setting } from '@/generated/prisma';
import db, { experienceSchema, prisma } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET() {
    const [settings, skills, projects, experience, resume] = await Promise.all([
        db.setting.getAll(),
        prisma.skill.findMany({
            where: {
                is_home_page: true,
            },
            orderBy: {
                sort_index: "asc"
            }
        }),
        prisma.project.findMany({
            where: {
                is_home_page: true,
            },
            orderBy: {
                sort_index: "asc"
            }
        }),
        prisma.experience.findMany({
            where: {
                is_home_page: true,
            },
            orderBy: {
                sort_index: "asc"
            }
        }),
        prisma.resume.findFirst({
            where: {
                is_active: true
            }
        })
    ]);

    const initialSetting: any = {};

    if (settings && settings?.length) {
        settings.forEach((set: Setting) => {
            initialSetting[set.key] = set.value;
        })
    }

    if (resume) {
        initialSetting.resume_url = resume.url;
    }

    const response = {
        setting: initialSetting,
        experience,
        projects,
        skills
    }

    return NextResponse.json(response);
}