/*
  Warnings:

  - The primary key for the `Players` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Players` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PlayerKDA" DROP CONSTRAINT "PlayerKDA_playerId_fkey";

-- DropForeignKey
ALTER TABLE "UserTeam" DROP CONSTRAINT "UserTeam_botlanerId_fkey";

-- DropForeignKey
ALTER TABLE "UserTeam" DROP CONSTRAINT "UserTeam_captinId_fkey";

-- DropForeignKey
ALTER TABLE "UserTeam" DROP CONSTRAINT "UserTeam_junglerId_fkey";

-- DropForeignKey
ALTER TABLE "UserTeam" DROP CONSTRAINT "UserTeam_midlanerId_fkey";

-- DropForeignKey
ALTER TABLE "UserTeam" DROP CONSTRAINT "UserTeam_sup1Id_fkey";

-- DropForeignKey
ALTER TABLE "UserTeam" DROP CONSTRAINT "UserTeam_sup2Id_fkey";

-- DropForeignKey
ALTER TABLE "UserTeam" DROP CONSTRAINT "UserTeam_supporterId_fkey";

-- DropForeignKey
ALTER TABLE "UserTeam" DROP CONSTRAINT "UserTeam_toplanerId_fkey";

-- AlterTable
ALTER TABLE "PlayerKDA" ALTER COLUMN "playerId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Players" DROP CONSTRAINT "Players_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Players_pkey" PRIMARY KEY ("playerName");

-- AlterTable
ALTER TABLE "UserTeam" ALTER COLUMN "toplanerId" SET DATA TYPE TEXT,
ALTER COLUMN "junglerId" SET DATA TYPE TEXT,
ALTER COLUMN "midlanerId" SET DATA TYPE TEXT,
ALTER COLUMN "botlanerId" SET DATA TYPE TEXT,
ALTER COLUMN "supporterId" SET DATA TYPE TEXT,
ALTER COLUMN "sup1Id" SET DATA TYPE TEXT,
ALTER COLUMN "sup2Id" SET DATA TYPE TEXT,
ALTER COLUMN "captinId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "UserTeam" ADD CONSTRAINT "UserTeam_toplanerId_fkey" FOREIGN KEY ("toplanerId") REFERENCES "Players"("playerName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTeam" ADD CONSTRAINT "UserTeam_junglerId_fkey" FOREIGN KEY ("junglerId") REFERENCES "Players"("playerName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTeam" ADD CONSTRAINT "UserTeam_midlanerId_fkey" FOREIGN KEY ("midlanerId") REFERENCES "Players"("playerName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTeam" ADD CONSTRAINT "UserTeam_botlanerId_fkey" FOREIGN KEY ("botlanerId") REFERENCES "Players"("playerName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTeam" ADD CONSTRAINT "UserTeam_supporterId_fkey" FOREIGN KEY ("supporterId") REFERENCES "Players"("playerName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTeam" ADD CONSTRAINT "UserTeam_sup1Id_fkey" FOREIGN KEY ("sup1Id") REFERENCES "Players"("playerName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTeam" ADD CONSTRAINT "UserTeam_sup2Id_fkey" FOREIGN KEY ("sup2Id") REFERENCES "Players"("playerName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTeam" ADD CONSTRAINT "UserTeam_captinId_fkey" FOREIGN KEY ("captinId") REFERENCES "Players"("playerName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerKDA" ADD CONSTRAINT "PlayerKDA_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Players"("playerName") ON DELETE RESTRICT ON UPDATE CASCADE;
