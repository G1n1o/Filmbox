DROP TABLE IF EXISTS `seat_reservation`;

CREATE TABLE `seat_reservation` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `screening_id` int NOT NULL,
  `seat_row` int NOT NULL,
  `seat_number` int NOT NULL,
  `reserved_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `screening_id` (`screening_id`,`seat_row`,`seat_number`),
  KEY `fk_user` (`user_id`),
  CONSTRAINT `fk_screening` FOREIGN KEY (`screening_id`) REFERENCES `screening` (`id`),
  CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);