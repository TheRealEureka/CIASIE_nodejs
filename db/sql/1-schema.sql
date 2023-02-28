-- Adminer 4.6.3 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `client`;
CREATE TABLE `client` (
  `idClient` int(11) NOT NULL AUTO_INCREMENT,
  `nom_client` varchar(128) NOT NULL,
  `mail_client` varchar(256) NOT NULL,
  `passwd` varchar(256) NOT NULL,
  `cumul_achats` decimal(8,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `commande`;
CREATE TABLE `commande` (
  `idCmd` varchar(128) NOT NULL,
  `dateCmd` date NOT NULL,
  `livraison` datetime NOT NULL,
  `montant` decimal(8,2) DEFAULT NULL,
  `remise` decimal(8,2) DEFAULT NULL,
  `client_id` int(11) DEFAULT NULL,
  `ref_paiement` varchar(128) DEFAULT NULL,
  `date_paiement` datetime DEFAULT NULL,
  `mode_paiement` int(11) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `produit`;
CREATE TABLE `produit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  'categorie' varchar(128) NOT NULL,
  `nom` varchar(128) NOT NULL,
  `description` text NOT NULL,
  `prix` decimal(8,2) NOT NULL,
  `image` varchar(256) DEFAULT NULL,
  `stock` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `produit_commande`;
CREATE TABLE `produit_commande` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `produit_id` int(11) NOT NULL,
  `commande_id` varchar(128) NOT NULL,
  `quantite` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;






-- 2019-11-08 13:47:44