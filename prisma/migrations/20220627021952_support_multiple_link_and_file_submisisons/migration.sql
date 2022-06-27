/*
  Warnings:

  - The `link` column on the `Submission` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `file` column on the `Submission` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "link",
ADD COLUMN     "link" TEXT[],
DROP COLUMN "file",
ADD COLUMN     "file" TEXT[];
