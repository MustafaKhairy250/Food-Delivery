-- CreateTable
CREATE TABLE `ArchivedMenuItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `originalId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `describtion` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `restaurantId` INTEGER NOT NULL,
    `archivedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DeleteRestaurantRequest` ADD CONSTRAINT `DeleteRestaurantRequest_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DeleteRestaurantRequest` ADD CONSTRAINT `DeleteRestaurantRequest_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
