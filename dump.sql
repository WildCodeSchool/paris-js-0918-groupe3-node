-- MySQL dump 10.13  Distrib 5.7.24, for Linux (x86_64)
--
-- Host: localhost    Database: dessine_moi_un_job
-- ------------------------------------------------------
-- Server version	5.7.24-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `answers`
--

DROP TABLE IF EXISTS `answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `answers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` text NOT NULL,
  `file_link` varchar(255) NOT NULL,
  `id_candidates` int(11) NOT NULL,
  `id_questions` int(11) NOT NULL,
  `id_offers` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_candidates_answers` (`id_candidates`),
  KEY `fk_id_offers_answers` (`id_offers`),
  KEY `fk_id_questions_answers` (`id_questions`),
  CONSTRAINT `fk_id_candidates_answers` FOREIGN KEY (`id_candidates`) REFERENCES `candidates` (`id`),
  CONSTRAINT `fk_id_offers_answers` FOREIGN KEY (`id_offers`) REFERENCES `offers` (`id`),
  CONSTRAINT `fk_id_questions_answers` FOREIGN KEY (`id_questions`) REFERENCES `questions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answers`
--

LOCK TABLES `answers` WRITE;
/*!40000 ALTER TABLE `answers` DISABLE KEYS */;
/*!40000 ALTER TABLE `answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `applications` (
  `id_candidates` int(11) NOT NULL,
  `id_offers` int(11) NOT NULL,
  `is_sent` tinyint(1) NOT NULL,
  `status` varchar(9) NOT NULL,
  PRIMARY KEY (`id_candidates`,`id_offers`),
  KEY `fk_id_offers_applications` (`id_offers`),
  CONSTRAINT `fk_id_candidates_applications` FOREIGN KEY (`id_candidates`) REFERENCES `candidates` (`id`),
  CONSTRAINT `fk_id_offers_applications` FOREIGN KEY (`id_offers`) REFERENCES `offers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `candidates`
--

DROP TABLE IF EXISTS `candidates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `candidates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `phone` bigint(20) NOT NULL,
  `token` varchar(50) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidates`
--

LOCK TABLES `candidates` WRITE;
/*!40000 ALTER TABLE `candidates` DISABLE KEYS */;
/*!40000 ALTER TABLE `candidates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `siret` bigint(14) NOT NULL,
  `description` text NOT NULL,
  `logo` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `offers`
--

DROP TABLE IF EXISTS `offers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `offers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `contract_type` varchar(15) NOT NULL,
  `place` varchar(50) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `is_published` tinyint(1) NOT NULL,
  `valid_until` date NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL,
  `id_companies` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_companies_offers` (`id_companies`),
  CONSTRAINT `fk_id_companies_offers` FOREIGN KEY (`id_companies`) REFERENCES `offers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offers`
--

LOCK TABLES `offers` WRITE;
/*!40000 ALTER TABLE `offers` DISABLE KEYS */;
INSERT INTO `offers` VALUES (1,'Developpeur Node.js','dev compétent','CDI','paris',1,1,'2019-01-23','2018-11-23','2018-11-23',1),(2,'Balayeur ultra diplomé','Bac +42, Zoulou et tchèque courant','Stage','lyon',1,1,'2019-01-23','2018-11-23','2018-11-23',1),(3,'Balayeur ultra diplomé','Bac +42, Zoulou et tchèque courant','CDD','paris',1,1,'2019-01-23','2018-11-23','2018-11-23',1),(4,'Balayeur ultra diplomé','Bac +42, Zoulou et tchèque courant','CDI','tokyo',1,1,'2019-01-23','2018-11-23','2018-11-23',1),(5,'Balayeur ultra diplomé','Bac +42, Zoulou et tchèque courant','Stage','Oulan Bator',1,1,'2019-01-23','2018-11-23','2018-11-23',2),(6,'Balayeur ultra diplomé','Bac +42, Zoulou et tchèque courant','Stage','Oulan Bator',1,1,'2019-01-23','2018-11-23','2018-11-23',3),(7,'Chanteur de blues','et buveur de bière','CDD','paris',1,1,'2019-01-23','2018-11-23','2018-11-23',3),(8,'prof de maths','dans une ZEP','CDD','paris',1,1,'2019-01-23','2018-11-23','2018-11-23',6),(9,'Caissier','Chez Franprix','CDD','paris',1,1,'2019-01-24','2018-11-24','2018-11-24',2),(10,'Jongleur','avec des couteaux','CDI','Rio',1,1,'2019-01-24','2018-11-24','2018-11-24',2),(11,'Grutier','Port du casque obligatoire','CDD','Paris',1,1,'2019-01-24','2018-11-24','2018-11-24',2),(12,'Skatteur','Olympique','Stage','Moscou',1,1,'2019-01-24','2018-11-24','2018-11-24',2),(13,'Skatteur','Olympique','Stage','Moscou',1,1,'2019-01-24','2018-11-24','2018-11-24',2),(14,'Skatteur','Olympique','Stage','Moscou',1,1,'2019-01-24','2018-11-24','2018-11-24',2),(26,'Moniteur de plongée','dans les caraibes','CDI','Guadeloupe',1,1,'2019-01-25','2018-11-25','2018-11-25',12),(29,'Moniteur de plongée','dans les caraibes','CDI','Guadeloupe',1,1,'2019-01-25','2018-11-25','2018-11-25',12),(31,'Moniteur de plongée','dans les caraibes','CDI','Guadeloupe',1,1,'2019-01-25','2018-11-25','2018-11-25',12),(32,'Récéptionniste','travaille 60h par semaine, 7j/7 SMIC ou moins selon profil','CDI','Paris',1,1,'2019-01-25','2018-11-25','2018-11-25',3),(33,'Récéptionniste','travaille 60h par semaine, 7j/7 SMIC ou moins selon profil','CDI','Paris',1,1,'2019-01-25','2018-11-25','2018-11-25',3),(36,'Developpeur React','ljhjebckjbzj','CDD','paris',1,1,'2019-01-26','2018-11-26','2018-11-26',1);
/*!40000 ALTER TABLE `offers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `offers_questions`
--

DROP TABLE IF EXISTS `offers_questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `offers_questions` (
  `id_offers` int(11) NOT NULL,
  `id_questions` int(11) NOT NULL,
  KEY `fk_id_questions` (`id_questions`),
  KEY `id_offers` (`id_offers`),
  CONSTRAINT `fk_id_offers` FOREIGN KEY (`id_offers`) REFERENCES `offers` (`id`),
  CONSTRAINT `fk_id_questions` FOREIGN KEY (`id_questions`) REFERENCES `questions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offers_questions`
--

LOCK TABLES `offers_questions` WRITE;
/*!40000 ALTER TABLE `offers_questions` DISABLE KEYS */;
INSERT INTO `offers_questions` VALUES (26,1),(26,2),(26,3),(26,4),(26,5),(26,6),(29,1),(29,3),(31,1),(31,3),(33,3),(33,1),(33,2),(33,5),(33,6),(36,1),(36,2),(36,3);
/*!40000 ALTER TABLE `offers_questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` text NOT NULL,
  `is_custom` tinyint(1) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (1,'Une réalisation, perso ou pro, dont vous êtes fier-e et qui servirait pour ce job.',0,'2018-11-23','2018-11-23'),(2,'A votre avis, qu’est-ce qui pourrait être amélioré dans notre entreprise ?',0,'2018-11-23','2018-11-23'),(3,'Quel a été votre « plus bel échec » ?',0,'2018-11-23','2018-11-23'),(4,'Trois mois après votre embauche, on fait le point. Et voilà ce que vous avez apporté…',0,'2018-11-23','2018-11-23'),(5,'Pour vous, être heureux dans son travail, c’est quoi ? Le salaire ? L’équipe ? La possibilité d’évoluer ? La machine à café ?',0,'2018-11-23','2018-11-23'),(6,'Vous avez quelque chose à nous dire, un élément à nous envoyer pour nous convaincre ? Allez-y !',0,'2018-11-23','2018-11-23'),(12,'Hello world ?',1,'2018-11-23','2018-11-23'),(13,'Comment ça va ?',1,'2018-11-23','2018-11-23'),(14,'une question',1,'2018-11-24','2018-11-24'),(15,'une question',1,'2018-11-24','2018-11-24'),(16,'une question',1,'2018-11-25','2018-11-25'),(17,'une question',1,'2018-11-25','2018-11-25'),(18,'une question',1,'2018-11-25','2018-11-25'),(19,'une question',1,'2018-11-25','2018-11-25'),(20,'skcjbekjfb',1,'2018-11-26','2018-11-26');
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-26 17:32:00
