-- AlterTable
ALTER TABLE `user` ADD COLUMN `is_active` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `user_id` VARCHAR(191) NULL;
