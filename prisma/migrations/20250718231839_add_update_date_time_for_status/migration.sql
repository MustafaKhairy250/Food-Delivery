/*
  Warnings:

  - Added the required column `updatedAt` to the `DeleteRestaurantRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewdAt` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `RestaurantUpdateRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `DeleteRestaurantRequest` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Restaurant` ADD COLUMN `reviewdAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `RestaurantUpdateRequest` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
