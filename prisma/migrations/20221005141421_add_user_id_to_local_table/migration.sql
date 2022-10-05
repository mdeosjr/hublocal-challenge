/*
  Warnings:

  - Added the required column `userId` to the `locals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "locals" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "locals" ADD CONSTRAINT "locals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
