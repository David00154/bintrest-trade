-- CreateTable
CREATE TABLE `stats` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `earning` VARCHAR(191) NOT NULL,
    `balance` VARCHAR(191) NOT NULL,
    `withdraws` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `stats_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `stats` ADD CONSTRAINT `stats_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
