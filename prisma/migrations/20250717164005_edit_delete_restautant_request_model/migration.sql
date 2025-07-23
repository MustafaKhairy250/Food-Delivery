/*
  Warnings:

  - Added the required column `address` to the `DeleteRestaurantRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `DeleteRestaurantRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `DeleteRestaurantRequest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `DeleteRestaurantRequest` DROP FOREIGN KEY `DeleteRestaurantRequest_restaurantId_fkey`;

-- DropIndex
DROP INDEX `DeleteRestaurantRequest_restaurantId_fkey` ON `DeleteRestaurantRequest`;

-- AlterTable
ALTER TABLE `DeleteRestaurantRequest` ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `ownerId` INTEGER NOT NULL;
