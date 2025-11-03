/*
  Warnings:

  - You are about to drop the column `dayOpen` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `hourOpen` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "dayOpen",
DROP COLUMN "hourOpen";
