/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `sessionToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `sessionTokenExpiry` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- DropIndex
DROP INDEX "User_sessionToken_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
DROP COLUMN "sessionToken",
DROP COLUMN "sessionTokenExpiry";
