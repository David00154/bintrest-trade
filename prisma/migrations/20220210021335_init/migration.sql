-- CreateTable
CREATE TABLE `User` (
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_name_key`(`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
