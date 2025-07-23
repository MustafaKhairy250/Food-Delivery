-- CreateTable
CREATE TABLE `RestaurantUpdateRequest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `restaurantId` INTEGER NOT NULL,
    `name` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RestaurantUpdateRequest` ADD CONSTRAINT `RestaurantUpdateRequest_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
