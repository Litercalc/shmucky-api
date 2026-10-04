/*
  Warnings:

  - You are about to drop the column `maxTokensPerDay` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `tokensSpentCount` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "maxTokensPerDay",
DROP COLUMN "tokensSpentCount";
