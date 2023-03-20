DROP TABLE IF EXISTS `client`;
CREATE TABLE `client` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom_client` varchar(128) NOT NULL,
  `mail_client` varchar(256) NOT NULL,
  `passwd` varchar(256) NOT NULL,
  `cumul_achats` decimal(8,2) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `tokens_data`;
CREATE TABLE `tokens_data` (
    `client_id` INT(11) NOT NULL,
    `token` TEXT NOT NULL,
    `refresh_token` TEXT NOT NULL,
    PRIMARY KEY (`client_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
