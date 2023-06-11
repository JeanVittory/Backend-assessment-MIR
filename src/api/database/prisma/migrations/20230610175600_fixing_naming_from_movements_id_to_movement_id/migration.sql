/*
  Warnings:

  - You are about to drop the column `movementsId` on the `Artist` table. All the data in the column will be lost.
  - Added the required column `movementId` to the `Artist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Artist" DROP CONSTRAINT "Artist_movementsId_fkey";

-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "movementsId",
ADD COLUMN     "movementId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_movementId_fkey" FOREIGN KEY ("movementId") REFERENCES "Movements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
