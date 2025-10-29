-- CreateTable
CREATE TABLE `favorite_movies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tmdb_id` INTEGER NOT NULL,
    `titulo` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `favorite_movies_tmdb_id_key`(`tmdb_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
