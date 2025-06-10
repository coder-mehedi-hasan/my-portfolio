// utils/db.ts
import { PrismaClient } from '../generated/prisma';
import { z } from 'zod';

export const prisma = new PrismaClient();

// Validation Schemas
export const skillSchema = z.object({
    title: z.string(),
    sub_title: z.string().optional(),
    description: z.string().optional(),
    icon: z.string().optional(),
    is_home_page: z.boolean().optional()
});

export const adminUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

export const projectSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    icon: z.string().optional(),
    is_home_page: z.boolean().optional(),
    created_at: z.date().optional(),
    date: z.date().optional()
});

export const experienceSchema = z.object({
    designation: z.string(),
    company_name: z.string(),
    location: z.string(),
    description: z.string().optional(),
    icon: z.string().optional(),
    start_date: z.string().optional(),
    end_date: z.string().optional(),
    is_home_page: z.boolean().optional(),
    sort_index: z.number().nullable().optional()
});

export const testimonialSchema = z.object({
    author_name: z.string(),
    author_designation: z.string(),
    author_company_name: z.string(),
    author_image: z.string(),
    feedback: z.string().optional(),
    created_at: z.date().optional()
});

export const blogSchema = z.object({
    title: z.string(),
    sub_title: z.string().optional(),
    description: z.string().optional(),
    created_at: z.date().optional(),
    feature_image: z.string().optional(),
    like_count: z.number().optional(),
    deslike_count: z.number().optional()
});

export const commentSchema = z.object({
    comment: z.string(),
    created_at: z.date().optional(),
    author_name: z.string(),
    blog_id: z.number()
});

export const settingSchema = z.object({
    key: z.string(),
    value: z.string()
});

export const educationSchema = z.object({
    name: z.string(),
    institute_name: z.string(),
    start_date: z.date().optional(),
    end_date: z.date().optional(),
    institute_address: z.string().optional()
});

export const resumeSchema = z.object({
    url: z.string().optional(),
    is_active: z.boolean().optional()
});

const db = {
    skill: {
        create: async (payload: any) => prisma.skill.create({ data: skillSchema.parse(payload) }),
        getAll: async () => prisma.skill.findMany(),
        getById: async (id: number) => prisma.skill.findUnique({ where: { id } }),
        update: async (id: number, payload: any) => prisma.skill.update({ where: { id }, data: payload }),
        delete: async (id: number) => prisma.skill.delete({ where: { id } }),
    },
    adminUser: {
        create: async (payload: any) => prisma.adminUser.create({ data: adminUserSchema.parse(payload) }),
        getAll: async () => prisma.adminUser.findMany(),
        getById: async (id: number) => prisma.adminUser.findUnique({ where: { id } }),
        update: async (id: number, payload: any) => prisma.adminUser.update({ where: { id }, data: adminUserSchema.partial().parse(payload) }),
        delete: async (id: number) => prisma.adminUser.delete({ where: { id } }),
    },
    project: {
        create: async (payload: any) => prisma.project.create({ data: projectSchema.parse(payload) }),
        getAll: async () => prisma.project.findMany(),
        getById: async (id: number) => prisma.project.findUnique({ where: { id } }),
        update: async (id: number, payload: any) => prisma.project.update({ where: { id }, data: payload }),
        delete: async (id: number) => prisma.project.delete({ where: { id } }),
    },
    experience: {
        create: async (payload: any) => prisma.experience.create({ data: experienceSchema.parse(payload) }),
        getAll: async () => prisma.experience.findMany(),
        getById: async (id: number) => prisma.experience.findUnique({ where: { id } }),
        update: async (id: number, payload: any) => prisma.experience.update({ where: { id }, data: payload }),
        delete: async (id: number) => prisma.experience.delete({ where: { id } }),
    },
    testimonial: {
        create: async (payload: any) => prisma.testimonial.create({ data: testimonialSchema.parse(payload) }),
        getAll: async () => prisma.testimonial.findMany(),
        getById: async (id: number) => prisma.testimonial.findUnique({ where: { id } }),
        update: async (id: number, payload: any) => prisma.testimonial.update({ where: { id }, data: payload }),
        delete: async (id: number) => prisma.testimonial.delete({ where: { id } }),
    },
    blog: {
        create: async (payload: any) => prisma.blog.create({ data: blogSchema.parse(payload) }),
        getAll: async () => prisma.blog.findMany(),
        getById: async (id: number) => prisma.blog.findUnique({ where: { id } }),
        update: async (id: number, payload: any) => prisma.blog.update({ where: { id }, data: payload }),
        delete: async (id: number) => prisma.blog.delete({ where: { id } }),
    },
    comment: {
        create: async (payload: any) => prisma.comment.create({ data: commentSchema.parse(payload) }),
        getAll: async () => prisma.comment.findMany(),
        getById: async (id: number) => prisma.comment.findUnique({ where: { id } }),
        update: async (id: number, payload: any) => prisma.comment.update({ where: { id }, data: payload }),
        delete: async (id: number) => prisma.comment.delete({ where: { id } }),
    },
    setting: {
        create: async (payload: any) => prisma.setting.create({ data: settingSchema.parse(payload) }),
        getAll: async () => prisma.setting.findMany(),
        getById: async (id: number) => prisma.setting.findUnique({ where: { id } }),
        update: async (id: number, payload: any) => prisma.setting.update({ where: { id }, data: payload }),
        delete: async (id: number) => prisma.setting.delete({ where: { id } }),
    },
    education: {
        create: async (payload: any) => prisma.education.create({ data: educationSchema.parse(payload) }),
        getAll: async () => prisma.education.findMany(),
        getById: async (id: number) => prisma.education.findUnique({ where: { id } }),
        update: async (id: number, payload: any) => prisma.education.update({ where: { id }, data: payload }),
        delete: async (id: number) => prisma.education.delete({ where: { id } }),
    },
    resume: {
        create: async (payload: any) => prisma.resume.create({ data: resumeSchema.parse(payload) }),
        getAll: async () => prisma.resume.findMany(),
        getById: async (id: number) => prisma.resume.findUnique({ where: { id } }),
        update: async (id: number, payload: any) => prisma.resume.update({ where: { id }, data: payload }),
        delete: async (id: number) => prisma.resume.delete({ where: { id } }),
    }
};

export default db;
