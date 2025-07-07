DROP TABLE IF EXISTS `movies`;

CREATE TABLE `movies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `duration` int NOT NULL,
  `poster_url` varchar(255) NOT NULL,
  `release_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
)