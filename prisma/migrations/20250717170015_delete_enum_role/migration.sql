/*
  Warnings:

  - The values [DELETED] on the enum `Restaurant_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Restaurant` MODIFY `status` ENUM('REVIEWING', 'REVIEWED', 'UPDATING', 'UPDATED') NOT NULL DEFAULT 'REVIEWING';
