/*
  Warnings:

  - You are about to drop the `ArchivedMenuItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DeleteRestaurantRequest` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `deletedAt` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ArchivedMenuItem` DROP FOREIGN KEY `ArchivedMenuItem_restaurantId_fkey`;

-- DropForeignKey
ALTER TABLE `DeleteRestaurantRequest` DROP FOREIGN KEY `DeleteRestaurantRequest_ownerId_fkey`;

-- DropForeignKey
ALTER TABLE `DeleteRestaurantRequest` DROP FOREIGN KEY `DeleteRestaurantRequest_restaurantId_fkey`;

-- AlterTable
ALTER TABLE `Restaurant` ADD COLUMN `deletedAt` DATETIME(3) NOT NULL,
    MODIFY `status` ENUM('REVIEWING', 'REVIEWED', 'UPDATING', 'REJECTED', 'UPDATED', 'DELETED') NOT NULL DEFAULT 'REVIEWING';

-- DropTable
DROP TABLE `ArchivedMenuItem`;

-- DropTable
DROP TABLE `DeleteRestaurantRequest`;
