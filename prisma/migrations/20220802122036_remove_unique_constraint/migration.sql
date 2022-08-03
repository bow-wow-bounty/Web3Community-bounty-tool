/*
  Warnings:

  - The primary key for the `Winner` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Winner" DROP CONSTRAINT "Winner_pkey",
ADD CONSTRAINT "Winner_pkey" PRIMARY KEY ("wallet", "bountyId");
