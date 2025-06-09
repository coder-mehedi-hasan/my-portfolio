-- CreateTable
CREATE TABLE "skills" (
    "id" SERIAL NOT NULL,
    "is_home_page" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL,
    "sub_title" TEXT,
    "description" TEXT,
    "icon" TEXT,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);
