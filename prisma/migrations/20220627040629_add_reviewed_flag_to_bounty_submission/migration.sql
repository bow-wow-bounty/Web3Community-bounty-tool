/*
  Warnings:

  - Added the required column `reviewed` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "reviewed" BOOLEAN NOT NULL;
