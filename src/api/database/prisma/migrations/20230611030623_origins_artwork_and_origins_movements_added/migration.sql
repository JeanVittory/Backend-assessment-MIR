/*
  Warnings:

  - You are about to drop the column `localization` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the `Movements` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `origins_artworkId` to the `Artwork` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Artist" DROP CONSTRAINT "Artist_movementId_fkey";

-- DropForeignKey
ALTER TABLE "Artwork" DROP CONSTRAINT "Artwork_movementId_fkey";

-- AlterTable
ALTER TABLE "Artwork" DROP COLUMN "localization",
ADD COLUMN     "origins_artworkId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Movements";

-- CreateTable
CREATE TABLE "Movement" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "activity" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "origin_movementId" TEXT NOT NULL,

    CONSTRAINT "Movement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Origin_movement" (
    "id" TEXT NOT NULL,
    "localization" DECIMAL(65,30)[],
    "country" TEXT NOT NULL,

    CONSTRAINT "Origin_movement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Origins_artwork" (
    "id" TEXT NOT NULL,
    "localization" DECIMAL(65,30)[],
    "country" TEXT NOT NULL,

    CONSTRAINT "Origins_artwork_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_movementId_fkey" FOREIGN KEY ("movementId") REFERENCES "Movement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artwork" ADD CONSTRAINT "Artwork_origins_artworkId_fkey" FOREIGN KEY ("origins_artworkId") REFERENCES "Origins_artwork"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artwork" ADD CONSTRAINT "Artwork_movementId_fkey" FOREIGN KEY ("movementId") REFERENCES "Movement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movement" ADD CONSTRAINT "Movement_origin_movementId_fkey" FOREIGN KEY ("origin_movementId") REFERENCES "Origin_movement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
