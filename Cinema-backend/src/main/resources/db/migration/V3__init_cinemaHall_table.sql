DROP TABLE IF EXISTS `cinema_hall`;

CREATE TABLE `cinema_hall` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `capacity` int NOT NULL,
  `rows` int NOT NULL DEFAULT '10',
  `seats_per_row` int NOT NULL DEFAULT '12',
  PRIMARY KEY (`id`)
);

INSERT INTO `cinema_hall` VALUES (1,'Sala 1',120,10,12),(2,'Sala 2',80,8,10),(3,'Sala 3',100,10,10);