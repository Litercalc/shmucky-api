-- CreateTable
CREATE TABLE "SavedPasswords" (
    "id" SERIAL NOT NULL,
    "password" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "SavedPasswords_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SavedPasswords" ADD CONSTRAINT "SavedPasswords_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
