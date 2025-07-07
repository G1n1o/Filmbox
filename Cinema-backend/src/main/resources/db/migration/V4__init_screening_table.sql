DROP TABLE IF EXISTS `screening`;

CREATE TABLE `screening` (
  `id` int NOT NULL AUTO_INCREMENT,
  `movie_id` int NOT NULL,
  `cinema_hall_id` int NOT NULL,
  `screening_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `movie_id` (`movie_id`),
  KEY `cinema_hall_id` (`cinema_hall_id`),
  CONSTRAINT `screening_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`),
  CONSTRAINT `screening_ibfk_2` FOREIGN KEY (`cinema_hall_id`) REFERENCES `cinema_hall` (`id`)
);