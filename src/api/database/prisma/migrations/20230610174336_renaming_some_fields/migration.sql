/*
  Warnings:

  - You are about to drop the column `movementsId` on the `Artwork` table. All the data in the column will be lost.
  - Added the required column `movementId` to the `Artwork` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Artwork" DROP CONSTRAINT "Artwork_movementsId_fkey";

-- AlterTable
ALTER TABLE "Artwork" DROP COLUMN "movementsId",
ADD COLUMN     "movementId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Artwork" ADD CONSTRAINT "Artwork_movementId_fkey" FOREIGN KEY ("movementId") REFERENCES "Movements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
