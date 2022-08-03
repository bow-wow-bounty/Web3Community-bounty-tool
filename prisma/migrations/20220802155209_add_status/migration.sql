/*
  Warnings:

  - Added the required column `status` to the `Bounty` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NOT_APPROVED', 'APPROVED', 'AWARDED');

-- AlterTable
ALTER TABLE "Bounty" ADD COLUMN     "status" "Status" NOT NULL;
