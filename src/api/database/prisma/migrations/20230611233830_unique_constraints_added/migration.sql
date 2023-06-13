/*
  Warnings:

  - A unique constraint covering the columns `[firstname]` on the table `Artist` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lastname]` on the table `Artist` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bio]` on the table `Artist` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Artwork` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[description]` on the table `Artwork` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Movement` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[description]` on the table `Movement` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Artist_firstname_key" ON "Artist"("firstname");

-- CreateIndex
CREATE UNIQUE INDEX "Artist_lastname_key" ON "Artist"("lastname");

-- CreateIndex
CREATE UNIQUE INDEX "Artist_bio_key" ON "Artist"("bio");

-- CreateIndex
CREATE UNIQUE INDEX "Artwork_name_key" ON "Artwork"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Artwork_description_key" ON "Artwork"("description");

-- CreateIndex
CREATE UNIQUE INDEX "Movement_name_key" ON "Movement"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Movement_description_key" ON "Movement"("description");
