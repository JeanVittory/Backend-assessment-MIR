-- DropForeignKey
ALTER TABLE "Artist" DROP CONSTRAINT "Artist_movementId_fkey";

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_movementId_fkey" FOREIGN KEY ("movementId") REFERENCES "Movement"("id") ON DELETE CASCADE ON UPDATE CASCADE;
