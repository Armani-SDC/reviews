

-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Products'
--
-- ---

DROP TABLE IF EXISTS `Products`;

CREATE TABLE `Products` (
  `product_id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  PRIMARY KEY (`product_id`)
);

-- ---
-- Table 'Photos'
--
-- ---

DROP TABLE IF EXISTS `Photos`;

CREATE TABLE `Photos` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `url` VARCHAR(500) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Reviews'
--
-- ---

DROP TABLE IF EXISTS `Reviews`;

CREATE TABLE `Reviews` (
  `review_id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `product_id` INTEGER NULL DEFAULT NULL,
  `rating` INTEGER NULL DEFAULT NULL,
  `summary` INTEGER NULL DEFAULT NULL,
  `recommend` INTEGER NULL DEFAULT NULL,
  `response` VARCHAR(500) NULL DEFAULT NULL,
  `body` VARCHAR(500) NULL DEFAULT NULL,
  `date` VARCHAR NULL DEFAULT NULL,
  `reviewer_name` VARCHAR(100) NULL DEFAULT NULL,
  `helpfulness` INTEGER NULL DEFAULT NULL,
  `photo_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`review_id`)
);

-- ---
-- Table 'Meta'
--
-- ---

DROP TABLE IF EXISTS `Meta`;

CREATE TABLE `Meta` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `product_id` VARCHAR NULL DEFAULT NULL,
  `ratings` INTEGER NULL DEFAULT NULL,
  `recommended` INTEGER NULL DEFAULT NULL,
  `characteristics_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Characteristics'
--
-- ---

DROP TABLE IF EXISTS `Characteristics`;

CREATE TABLE `Characteristics` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `Size` VARCHAR NULL DEFAULT NULL,
  `Width` VARCHAR NULL DEFAULT NULL,
  `Comfort` VARCHAR NULL DEFAULT NULL,
  `Fit` VARCHAR NULL DEFAULT NULL,
  `Length` VARCHAR NULL DEFAULT NULL,
  `Quality` VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `Reviews` ADD FOREIGN KEY (product_id) REFERENCES `Products` (`product_id`);
ALTER TABLE `Reviews` ADD FOREIGN KEY (photo_id) REFERENCES `Photos` (`id`);
ALTER TABLE `Meta` ADD FOREIGN KEY (product_id) REFERENCES `Products` (`product_id`);
ALTER TABLE `Meta` ADD FOREIGN KEY (characteristics_id) REFERENCES `Characteristics` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Products` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Photos` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Reviews` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Meta` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Characteristics` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Products` (`product_id`) VALUES
-- ('');
-- INSERT INTO `Photos` (`id`,`url`) VALUES
-- ('','');
-- INSERT INTO `Reviews` (`review_id`,`product_id`,`rating`,`summary`,`recommend`,`response`,`body`,`date`,`reviewer_name`,`helpfulness`,`photo_id`) VALUES
-- ('','','','','','','','','','','');
-- INSERT INTO `Meta` (`id`,`product_id`,`ratings`,`recommended`,`characteristics_id`) VALUES
-- ('','','','','');
-- INSERT INTO `Characteristics` (`id`,`Size`,`Width`,`Comfort`,`Fit`,`Length`,`Quality`) VALUES
-- ('','','','','','','');