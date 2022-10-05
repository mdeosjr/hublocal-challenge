-- DropIndex
DROP INDEX "responsibles_isMain_key";

-- AlterTable
ALTER TABLE "responsibles" ALTER COLUMN "isMain" DROP DEFAULT;
