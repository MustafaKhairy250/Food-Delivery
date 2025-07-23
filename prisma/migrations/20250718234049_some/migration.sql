/*
  Warnings:

  - You are about to drop the column `originalId` on the `ArchivedMenuItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ArchivedMenuItem` DROP COLUMN `originalId`;

-- AddForeignKey
ALTER TABLE `ArchivedMenuItem` ADD CONSTRAINT `ArchivedMenuItem_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `DeleteRestaurantRequest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
