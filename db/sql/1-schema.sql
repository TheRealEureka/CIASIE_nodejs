-- Adminer 4.6.3 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

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


DROP TABLE IF EXISTS `commande`;
CREATE TABLE `commande` (
  `id` varchar(128) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `livraison` datetime NOT NULL,
  `nom` varchar(128) NOT NULL,
  `mail` varchar(256) NOT NULL,
  `montant` decimal(8,2) DEFAULT NULL,
  `remise` decimal(8,2) DEFAULT NULL,
  `token` varchar(128) DEFAULT NULL,
  `client_id` int(11) DEFAULT NULL,
  `ref_paiement` varchar(128) DEFAULT NULL,
  `date_paiement` datetime DEFAULT NULL,
  `mode_paiement` int(11) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `item`;
CREATE TABLE `item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uri` varchar(128) NOT NULL,
  `libelle` varchar(128) DEFAULT NULL,
  `tarif` decimal(8,2) DEFAULT NULL,
  `quantite` int(11) DEFAULT 1,
  `command_id` varchar(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- 2019-11-08 13:47:44