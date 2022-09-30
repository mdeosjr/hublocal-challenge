/*
  Warnings:

  - A unique constraint covering the columns `[companyId]` on the table `locals` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "responsibles" DROP CONSTRAINT "responsibles_companyId_fkey";

-- DropForeignKey
ALTER TABLE "responsibles" DROP CONSTRAINT "responsibles_localId_fkey";

-- AlterTable
ALTER TABLE "responsibles" ALTER COLUMN "companyId" DROP NOT NULL,
ALTER COLUMN "localId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "locals_companyId_key" ON "locals"("companyId");

-- AddForeignKey
ALTER TABLE "responsibles" ADD CONSTRAINT "responsibles_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "responsibles" ADD CONSTRAINT "responsibles_localId_fkey" FOREIGN KEY ("localId") REFERENCES "locals"("id") ON DELETE SET NULL ON UPDATE CASCADE;
