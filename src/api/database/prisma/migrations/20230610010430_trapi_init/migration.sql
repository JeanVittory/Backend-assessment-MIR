/*
  Warnings:

  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_favId_fkey";

-- DropTable
DROP TABLE "Item";

-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "death" TEXT NOT NULL DEFAULT 'Unknown',
    "pseudonym" TEXT,
    "nationality" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "movementsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artwork" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "technique" TEXT NOT NULL,
    "localization" DECIMAL(65,30)[] DEFAULT ARRAY[0, 0]::DECIMAL(65,30)[],
    "price" INTEGER NOT NULL,
    "artistId" TEXT NOT NULL,
    "movementsId" TEXT NOT NULL,
    "favId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Artwork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movements" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "origin" TEXT NOT NULL DEFAULT 'unknown',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Movements_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_movementsId_fkey" FOREIGN KEY ("movementsId") REFERENCES "Movements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artwork" ADD CONSTRAINT "Artwork_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artwork" ADD CONSTRAINT "Artwork_movementsId_fkey" FOREIGN KEY ("movementsId") REFERENCES "Movements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artwork" ADD CONSTRAINT "Artwork_favId_fkey" FOREIGN KEY ("favId") REFERENCES "Fav"("id") ON DELETE SET NULL ON UPDATE CASCADE;
