/*
  Warnings:

  - You are about to drop the `SavedPassword` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SavedPassword" DROP CONSTRAINT "SavedPassword_userId_fkey";

-- DropTable
DROP TABLE "SavedPassword";
