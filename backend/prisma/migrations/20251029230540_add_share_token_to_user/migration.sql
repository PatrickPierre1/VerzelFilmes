/*
  Warnings:

  - A unique constraint covering the columns `[shareToken]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `shareToken` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_shareToken_key` ON `users`(`shareToken`);
