/*
  Warnings:

  - You are about to drop the column `description` on the `Fav` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `Fav` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Fav` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Fav` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `Fav` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Fav" DROP CONSTRAINT "Fav_userId_fkey";

-- AlterTable
ALTER TABLE "Fav" DROP COLUMN "description",
DROP COLUMN "link",
DROP COLUMN "title",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "favId" TEXT,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Fav" ADD CONSTRAINT "Fav_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_favId_fkey" FOREIGN KEY ("favId") REFERENCES "Fav"("id") ON DELETE SET NULL ON UPDATE CASCADE;
