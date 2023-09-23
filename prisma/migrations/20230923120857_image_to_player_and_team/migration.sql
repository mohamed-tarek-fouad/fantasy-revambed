-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('user', 'admin');

-- CreateEnum
CREATE TYPE "Lane" AS ENUM ('toplane', 'jungle', 'midlane', 'botlane', 'support');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "nationality" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'user',

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Players" (
    "id" SERIAL NOT NULL,
    "playerName" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "lane" "Lane" NOT NULL,
    "teamId" TEXT NOT NULL,
    "otp" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Players_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "teamName" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("teamName")
);

-- CreateTable
CREATE TABLE "UserTeam" (
    "id" SERIAL NOT NULL,
    "budget" INTEGER NOT NULL DEFAULT 100000000,
    "userId" INTEGER NOT NULL,
    "toplanerId" INTEGER NOT NULL,
    "junglerId" INTEGER NOT NULL,
    "midlanerId" INTEGER NOT NULL,
    "botlanerId" INTEGER NOT NULL,
    "supporterId" INTEGER NOT NULL,
    "sup1Id" INTEGER NOT NULL,
    "sup2Id" INTEGER NOT NULL,
    "captinId" INTEGER NOT NULL,
    "tripleCaptinStatus" BOOLEAN NOT NULL DEFAULT false,
    "allInStatus" BOOLEAN NOT NULL DEFAULT false,
    "teamFanStatus" BOOLEAN NOT NULL DEFAULT false,
    "points" INTEGER NOT NULL DEFAULT 0,
    "transfers" INTEGER NOT NULL DEFAULT 2,
    "tripleCaptin" INTEGER NOT NULL DEFAULT 1,
    "allIn" INTEGER NOT NULL DEFAULT 1,
    "teamFan" INTEGER NOT NULL DEFAULT 1,
    "nextWeekPoints" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UserTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Matches" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "team1Id" TEXT NOT NULL,
    "team2Id" TEXT NOT NULL,

    CONSTRAINT "Matches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerKDA" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "kills" INTEGER NOT NULL,
    "deathes" INTEGER NOT NULL,
    "assists" INTEGER NOT NULL,
    "visionScore" INTEGER NOT NULL,
    "MVB" BOOLEAN NOT NULL DEFAULT false,
    "cs" INTEGER NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "week" INTEGER NOT NULL,

    CONSTRAINT "PlayerKDA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokens" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "league" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "founderId" INTEGER NOT NULL,

    CONSTRAINT "league_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leagueMembers" (
    "leagueId" INTEGER NOT NULL,
    "memberId" INTEGER NOT NULL,

    CONSTRAINT "leagueMembers_pkey" PRIMARY KEY ("leagueId","memberId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserTeam_userId_key" ON "UserTeam"("userId");

-- AddForeignKey
ALTER TABLE "Players" ADD CONSTRAINT "Players_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("teamName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTeam" ADD CONSTRAINT "UserTeam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTeam" ADD CONSTRAINT "UserTeam_toplanerId_fkey" FOREIGN KEY ("toplanerId") REFERENCES "Players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTeam" ADD CONSTRAINT "UserTeam_junglerId_fkey" FOREIGN KEY ("junglerId") REFERENCES "Players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTeam" ADD CONSTRAINT "UserTeam_midlanerId_fkey" FOREIGN KEY ("midlanerId") REFERENCES "Players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTeam" ADD CONSTRAINT "UserTeam_botlanerId_fkey" FOREIGN KEY ("botlanerId") REFERENCES "Players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTeam" ADD CONSTRAINT "UserTeam_supporterId_fkey" FOREIGN KEY ("supporterId") REFERENCES "Players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTeam" ADD CONSTRAINT "UserTeam_sup1Id_fkey" FOREIGN KEY ("sup1Id") REFERENCES "Players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTeam" ADD CONSTRAINT "UserTeam_sup2Id_fkey" FOREIGN KEY ("sup2Id") REFERENCES "Players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTeam" ADD CONSTRAINT "UserTeam_captinId_fkey" FOREIGN KEY ("captinId") REFERENCES "Players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Matches" ADD CONSTRAINT "Matches_team1Id_fkey" FOREIGN KEY ("team1Id") REFERENCES "Team"("teamName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Matches" ADD CONSTRAINT "Matches_team2Id_fkey" FOREIGN KEY ("team2Id") REFERENCES "Team"("teamName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerKDA" ADD CONSTRAINT "PlayerKDA_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "league" ADD CONSTRAINT "league_founderId_fkey" FOREIGN KEY ("founderId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leagueMembers" ADD CONSTRAINT "leagueMembers_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "league"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leagueMembers" ADD CONSTRAINT "leagueMembers_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
