/*
  Warnings:

  - You are about to drop the column `FP` on the `PlayerKDA` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PlayerKDA" DROP COLUMN "FP",
ADD COLUMN     "FB" BOOLEAN NOT NULL DEFAULT false;
