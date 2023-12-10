CREATE DATABASE `jdu_msg`;

USE `jdu_msg`;

CREATE TABLE `Role` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL,
    `password` VARCHAR(50) NOT NULL,
    `description` VARCHAR(255),
    `permissions` JSON
);

CREATE TABLE `School` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100),
    `address` VARCHAR(255),
    `contact_email` VARCHAR(100)
);

CREATE TABLE `Admin` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(100),
    `firstname` VARCHAR(50),
    `lastname` VARCHAR(50),
    `password` VARCHAR(100),
    `role_id` INT,
    `school_id` INT,
    FOREIGN KEY (`role_id`) REFERENCES `Role`(`id`),
    FOREIGN KEY (`school_id`) REFERENCES `School`(`id`)
);

CREATE TABLE `User` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `firstname` VARCHAR(50),
    `lastname` VARCHAR(50),
    `middlename` VARCHAR(50),
    `student_id` VARCHAR(20),
    `email` VARCHAR(100),
    `phone_number` VARCHAR(13),
    `father_name` VARCHAR(50),
    `mother_name` VARCHAR(50),
    `father_phone_number` VARCHAR(13),
    `mother_phone_number` VARCHAR(13),
    `password` VARCHAR(100),
    `last_login_date` DATETIME,
    `school_id` INT,
    FOREIGN KEY (`school_id`) REFERENCES `School`(`id`)
);
CREATE TABLE `SchoolGroup` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50),
    `created_date` DATETIME,
    `school_id` INT,
    FOREIGN KEY (`school_id`) REFERENCES `School`(`id`)
);

CREATE TABLE `MessageType` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(100),
    `icon` VARCHAR(50),
    `school_id` INT,
    FOREIGN KEY (`school_id`) REFERENCES `School`(`id`)
);

CREATE TABLE `Link` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(100),
    `url` VARCHAR(255),
    `school_id` INT,
    FOREIGN KEY (`school_id`) REFERENCES `School`(`id`)
);

CREATE TABLE `Message` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(100),
    `description` TEXT,
    `priority` INT,
    `created_date` DATETIME,
    `admin_id` INT,
    `updated_date` DATETIME,
    `messagetype_id` INT,
    `school_id` INT,
    FOREIGN KEY (`admin_id`) REFERENCES `Admin`(`id`),
    FOREIGN KEY (`messagetype_id`) REFERENCES `MessageType`(`id`),
    FOREIGN KEY (`school_id`) REFERENCES `School`(`id`)
);

CREATE TABLE `SentMessage` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `message_id` INT,
    `sent_at` DATETIME,
    `school_id` INT,
    FOREIGN KEY (`message_id`) REFERENCES `Message`(`id`),
    FOREIGN KEY (`school_id`) REFERENCES `School`(`id`)
);

CREATE TABLE `UserMessage` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `sentmessage_id` INT,
    `user_id` INT,
    `group_id` INT,
    `is_read` TINYINT,
    `is_saved` TINYINT,
    `read_date` DATETIME,
    `school_id` INT,
    FOREIGN KEY (`sentmessage_id`) REFERENCES `SentMessage`(`id`),
    FOREIGN KEY (`user_id`) REFERENCES `User`(`id`),
    FOREIGN KEY (`group_id`) REFERENCES `SchoolGroup`(`id`),
    FOREIGN KEY (`school_id`) REFERENCES `School`(`id`)
);

CREATE TABLE `Image` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `message_id` INT,
    `image_url` VARCHAR(255),
    FOREIGN KEY (`message_id`) REFERENCES `Message`(`id`)
);