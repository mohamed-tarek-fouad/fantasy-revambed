/*
  Warnings:

  - You are about to drop the column `assists` on the `PlayerKDA` table. All the data in the column will be lost.
  - You are about to drop the column `cs` on the `PlayerKDA` table. All the data in the column will be lost.
  - You are about to drop the column `deathes` on the `PlayerKDA` table. All the data in the column will be lost.
  - You are about to drop the column `kills` on the `PlayerKDA` table. All the data in the column will be lost.
  - You are about to drop the column `visionScore` on the `PlayerKDA` table. All the data in the column will be lost.
  - Added the required column `CSM` to the `PlayerKDA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `KDA` to the `PlayerKDA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `VSPM` to the `PlayerKDA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avgAssists` to the `PlayerKDA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avgDeaths` to the `PlayerKDA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avgKills` to the `PlayerKDA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `games` to the `PlayerKDA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `winRate` to the `PlayerKDA` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PlayerKDA" DROP COLUMN "assists",
DROP COLUMN "cs",
DROP COLUMN "deathes",
DROP COLUMN "kills",
DROP COLUMN "visionScore",
ADD COLUMN     "CSM" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "FP" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "KDA" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "VSPM" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "avgAssists" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "avgDeaths" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "avgKills" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "games" INTEGER NOT NULL,
ADD COLUMN     "winRate" TEXT NOT NULL;
