/*
  Warnings:

  - You are about to drop the column `mapId` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `GameSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "mapId";

-- AlterTable
ALTER TABLE "GameSession" DROP COLUMN "startTime",
ALTER COLUMN "endTime" SET DATA TYPE TEXT;
