-- AlterTable
ALTER TABLE "experience" ADD COLUMN     "job_type" TEXT;

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "sub_title" TEXT,
ADD COLUMN     "tools" JSONB DEFAULT '[]';
