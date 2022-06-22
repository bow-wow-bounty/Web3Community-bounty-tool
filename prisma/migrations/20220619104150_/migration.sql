/*
  Warnings:

  - The `roles` column on the `Roles` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `creator` to the `Bounty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Bounty` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CREATOR', 'ADMIN', 'SUPER_ADMIN');

-- AlterTable
ALTER TABLE "Bounty" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "creator" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Roles" DROP COLUMN "roles",
ADD COLUMN     "roles" "Role"[];

-- CreateTable
CREATE TABLE "Winner" (
    "wallet" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "Winner_pkey" PRIMARY KEY ("wallet")
);

-- CreateTable
CREATE TABLE "Submission" (
    "wallet" TEXT NOT NULL,
    "bountyId" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "discord" TEXT NOT NULL,
    "twitter" TEXT NOT NULL,
    "telegram" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("wallet","bountyId")
);

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_bountyId_fkey" FOREIGN KEY ("bountyId") REFERENCES "Bounty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
