/*
  Warnings:

  - The primary key for the `ToDoList` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `SavedPasswords` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[sessionToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sessionToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionTokenExpiry` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SavedPasswords" DROP CONSTRAINT "SavedPasswords_userId_fkey";

-- DropForeignKey
ALTER TABLE "ToDoList" DROP CONSTRAINT "ToDoList_userId_fkey";

-- AlterTable
ALTER TABLE "ToDoList" DROP CONSTRAINT "ToDoList_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ToDoList_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ToDoList_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "sessionToken" TEXT NOT NULL,
ADD COLUMN     "sessionTokenExpiry" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- DropTable
DROP TABLE "SavedPasswords";

-- CreateTable
CREATE TABLE "SavedPassword" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SavedPassword_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_sessionToken_key" ON "User"("sessionToken");

-- AddForeignKey
ALTER TABLE "SavedPassword" ADD CONSTRAINT "SavedPassword_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToDoList" ADD CONSTRAINT "ToDoList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
