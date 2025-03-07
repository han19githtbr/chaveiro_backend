-- CreateTable
CREATE TABLE `Post` (
    `id` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image` (
    `id` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `postId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Security` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `credential` VARCHAR(512) NOT NULL,
    `code` VARCHAR(32) NULL,
    `codeExpiresIn` DATETIME(3) NULL,
    `validated` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Security_credential_key`(`credential`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Permission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` ENUM('configuracoes', 'chaveiros', 'servicos', 'desenvolvimento', 'dashboard') NOT NULL,

    UNIQUE INDEX `Permission_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role` ENUM('admin', 'user') NOT NULL DEFAULT 'admin',
    `name` VARCHAR(512) NOT NULL,
    `email` VARCHAR(512) NOT NULL,
    `password` TEXT NOT NULL,
    `status` ENUM('ativo', 'inativo', 'pendente') NOT NULL,
    `imageUrl` TEXT NULL,
    `code` VARCHAR(32) NULL,
    `codeExpiresIn` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role` ENUM('admin', 'user') NOT NULL DEFAULT 'user',
    `name` VARCHAR(512) NOT NULL,
    `email` VARCHAR(512) NOT NULL,
    `password` TEXT NOT NULL,
    `phone` VARCHAR(11) NOT NULL,
    `status` ENUM('ativo', 'inativo', 'pendente') NOT NULL,
    `imageUrl` TEXT NULL,
    `code` VARCHAR(32) NULL,
    `codeExpiresIn` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chaveiro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(512) NOT NULL,
    `imageUrl` VARCHAR(1000) NULL,
    `phone` VARCHAR(512) NOT NULL,
    `endereco` VARCHAR(512) NOT NULL,
    `status` ENUM('ativo', 'inativo') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(512) NOT NULL,
    `imageUrl` VARCHAR(1000) NULL,
    `service` VARCHAR(191) NOT NULL DEFAULT '',
    `phone` VARCHAR(512) NOT NULL,
    `endereco` VARCHAR(512) NOT NULL,
    `status` ENUM('servido', 'andando', 'pendente', 'cancelado') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `message` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `endereco` VARCHAR(191) NOT NULL DEFAULT '',
    `phone` VARCHAR(191) NOT NULL DEFAULT '',
    `imageUrl` VARCHAR(1000) NOT NULL,
    `service` VARCHAR(191) NOT NULL DEFAULT '',
    `status` ENUM('novo', 'pendente', 'servido', 'andando', 'cancelado') NOT NULL DEFAULT 'novo',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sender` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` INTEGER NOT NULL,
    `userName` VARCHAR(191) NOT NULL,
    `userPhone` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Servico` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cliente` VARCHAR(512) NULL,
    `imageUrl` VARCHAR(1000) NULL,
    `service` ENUM('copia', 'conserto') NOT NULL,
    `value` VARCHAR(512) NOT NULL,
    `status` ENUM('ativo', 'inativo') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AdminToPermission` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AdminToPermission_AB_unique`(`A`, `B`),
    INDEX `_AdminToPermission_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AdminToPermission` ADD CONSTRAINT `_AdminToPermission_A_fkey` FOREIGN KEY (`A`) REFERENCES `Admin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AdminToPermission` ADD CONSTRAINT `_AdminToPermission_B_fkey` FOREIGN KEY (`B`) REFERENCES `Permission`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
