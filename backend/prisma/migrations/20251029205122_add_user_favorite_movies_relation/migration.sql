/*
  Warnings:

  - A unique constraint covering the columns `[user_id,tmdb_id]` on the table `favorite_movies` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `favorite_movies` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `favorite_movies_tmdb_id_key` ON `favorite_movies`;

-- AlterTable
ALTER TABLE `favorite_movies` ADD COLUMN `user_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `favorite_movies_user_id_tmdb_id_key` ON `favorite_movies`(`user_id`, `tmdb_id`);

-- AddForeignKey
ALTER TABLE `favorite_movies` ADD CONSTRAINT `favorite_movies_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
