-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
-- flush privileges;

use user;

CREATE DATABASE user;

CREATE TABLE `user`.`customer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30) NOT NULL,
  `address` VARCHAR(30) NOT NULL,
  `number` INT NOT NULL,
  `auth_code` INT NULL,
  `valid_to` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `number_UNIQUE` (`number` ASC) VISIBLE);

CREATE TABLE `user`.`employee` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30) NOT NULL,
  `status` INT NOT NULL,
  `branch_id` INT ,
  `user_name` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `manager_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (manager_id) REFERENCES employee(id),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `user_name_UNIQUE` (`user_name` ASC) VISIBLE);
  
  
  CREATE TABLE `user`.`branch` (
  `id` INT NOT NULL AUTO_iNCREMENT,
  `name` VARCHAR(30) NOT NULL,
  PRIMARY KEY(`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);