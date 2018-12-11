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
  `password` varchar(60) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidates`
--

LOCK TABLES `candidates` WRITE;
/*!40000 ALTER TABLE `candidates` DISABLE KEYS */;
INSERT INTO `candidates` VALUES (1,'toto@gmail.com',607080910,'$2b$10$SaYQRpHv/uLWd89oBXl4XeqIsji0tr/s4P2R5QaZH.kYD3GLvvc8G','2018-12-11','2018-12-11',1),(2,'pere@noel.pn',835656565,'$2b$10$JJnE47erqPGKutUKFqSV/uoS/5Z.lVr1yyr9Qzy61F6XQXjev7Mbu','2018-12-11','2018-12-11',1),(3,'satan@demon.en',66666666666,'$2b$10$2/VXufqNahP7RWDqgRU0CujEW55ROlXujhYYAcpqwsRBxSM56D9g2','2018-12-11','2018-12-11',1);
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
  `password` varchar(60) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (11,'Wild Code School',976545689332,'Suspendisse convallis leo a velit consectetur lacinia. Phasellus sagittis nisi ultrices, mattis felis sed, fermentum ipsum. Duis purus lacus, finibus eu bibendum nec, viverra vel nunc. Nunc ac vehicula metus, ac iaculis odio. Morbi elementum, libero eget varius mollis, metus dolor suscipit velit, eu elementum odio odio ac dui. Nullam suscipit mauris feugiat congue congue. Sed quis elit tincidunt, iaculis mi eget, placerat turpis. Nam commodo efficitur felis et varius. Integer ullamcorper sapien eu sagittis iaculis. Vestibulum nulla mi, hendrerit non urna non, luctus fringilla ante. Donec aliquam eu nisi id malesuada. Suspendisse egestas volutpat odio, nec lobortis libero dictum sit amet. Sed sed pretium velit. Vivamus euismod, metus ut commodo vehicula, purus nisi commodo odio, non laoreet elit lorem pharetra magna. Suspendisse facilisis viverra dui, ut cursus ipsum mollis et. Nulla nec risus auctor, fringilla purus vel, hendrerit lacus.','src','www.wcs.com','wild@wcs.com','2018-12-11','2018-12-11','$2b$10$3yhJOTVOPH4Z6V1wmFJYGOqKT1qc7uQnmOJuYZ2fQ1DbsNwN4Rwli',1),(12,'Alten',685764769,'Suspendisse convallis leo a velit consectetur lacinia. Phasellus sagittis nisi ultrices, mattis felis sed, fermentum ipsum. Duis purus lacus, finibus eu bibendum nec, viverra vel nunc. Nunc ac vehicula metus, ac iaculis odio. Morbi elementum, libero eget varius mollis, metus dolor suscipit velit, eu elementum odio odio ac dui. Nullam suscipit mauris feugiat congue congue. Sed quis elit tincidunt, iaculis mi eget, placerat turpis. Nam commodo efficitur felis et varius. Integer ullamcorper sapien eu sagittis iaculis. Vestibulum nulla mi, hendrerit non urna non, luctus fringilla ante. Donec aliquam eu nisi id malesuada. Suspendisse egestas volutpat odio, nec lobortis libero dictum sit amet. Sed sed pretium velit. Vivamus euismod, metus ut commodo vehicula, purus nisi commodo odio, non laoreet elit lorem pharetra magna. Suspendisse facilisis viverra dui, ut cursus ipsum mollis et. Nulla nec risus auctor, fringilla purus vel, hendrerit lacus.','src','www.wcs.com','alten@alten.com','2018-12-11','2018-12-11','$2b$10$qp.oLdxCWO6eG55V4dNZGuw4dvKCdKtI.qPjPI18yhqaQfos5cdWa',1),(13,'Clevy',7876565346,'Suspendisse convallis leo a velit consectetur lacinia. Phasellus sagittis nisi ultrices, mattis felis sed, fermentum ipsum. Duis purus lacus, finibus eu bibendum nec, viverra vel nunc. Nunc ac vehicula metus, ac iaculis odio. Morbi elementum, libero eget varius mollis, metus dolor suscipit velit, eu elementum odio odio ac dui. Nullam suscipit mauris feugiat congue congue. Sed quis elit tincidunt, iaculis mi eget, placerat turpis. Nam commodo efficitur felis et varius. Integer ullamcorper sapien eu sagittis iaculis. Vestibulum nulla mi, hendrerit non urna non, luctus fringilla ante. Donec aliquam eu nisi id malesuada. Suspendisse egestas volutpat odio, nec lobortis libero dictum sit amet. Sed sed pretium velit. Vivamus euismod, metus ut commodo vehicula, purus nisi commodo odio, non laoreet elit lorem pharetra magna. Suspendisse facilisis viverra dui, ut cursus ipsum mollis et. Nulla nec risus auctor, fringilla purus vel, hendrerit lacus.','src','www.clevy.com','clevy@clevy.com','2018-12-11','2018-12-11','$2b$10$FAOM1BwErZZIHlmRaYAh8.RdUxvaUF8da1KcegFIh33VebmRuVL4K',1);
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
  KEY `fk_id_companies_offers` (`id_companies`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offers`
--

LOCK TABLES `offers` WRITE;
/*!40000 ALTER TABLE `offers` DISABLE KEYS */;
INSERT INTO `offers` VALUES (85,'Formateur React','Aenean diam nibh, ultrices quis semper ut, faucibus vulputate orci. Cras facilisis vehicula metus, eu tincidunt tellus mattis eu. Aliquam ac commodo urna, et dictum leo. Vestibulum rutrum orci ut ex iaculis, quis porta libero ultricies. Phasellus sit amet aliquam metus. Phasellus vel rhoncus leo, eget lobortis turpis. Cras at turpis ut est mollis pharetra et feugiat nisi. Pellentesque sit amet venenatis nibh, quis hendrerit eros. Ut at mi velit. Cras et lacus a dolor tempus fringilla.','CDI','Paris',1,1,'2019-02-11','2018-12-11','2018-12-11',11),(86,'Campus Manager','Etiam feugiat, enim ut iaculis hendrerit, lectus ipsum sagittis mauris, in aliquam nulla sem vel erat. Suspendisse pretium quam augue, a pretium arcu commodo sit amet. Ut et enim lectus. Sed viverra sed quam et viverra. Sed tellus mauris, pellentesque vitae nisi a, mattis placerat mauris. Morbi vitae diam velit. Phasellus tortor nisi, tempor in odio sollicitudin, malesuada eleifend neque. Proin venenatis accumsan massa et vestibulum. Sed ullamcorper tempus sem eu lacinia. Vestibulum velit velit, pharetra sed odio sit amet, sodales pulvinar mauris. Integer eu luctus magna. Aliquam erat volutpat. Nulla a ante elementum, suscipit lectus eget, euismod sem. Ut laoreet risus metus, in semper eros tincidunt sed. Ut quam nisi, ultricies ac felis eu, vehicula tempus odio. Fusce tincidunt fringilla sollicitudin.','CDD','Paris',1,1,'2019-02-11','2018-12-11','2018-12-11',11),(87,'Formateur','Ut sed dui et eros pellentesque imperdiet. Phasellus consectetur lectus tincidunt nibh aliquam consectetur. Curabitur tempor viverra efficitur. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed nulla felis, lacinia non nisl in, ornare posuere elit. Sed ut enim sed urna accumsan elementum vitae in enim. Nullam ornare porta quam, id ornare velit consequat quis. Maecenas hendrerit fermentum mauris, sit amet dignissim mi faucibus at. Curabitur erat tortor, fermentum laoreet elementum eget, viverra a diam. In elementum hendrerit quam sit amet facilisis. Praesent cursus purus non placerat lobortis. Cras ut ullamcorper arcu. Integer placerat hendrerit venenatis. Curabitur porta iaculis iaculis. Pellentesque non consequat sapien.','Stage','Toulouse',1,1,'2019-02-11','2018-12-11','2018-12-11',11),(88,'Ingénieur','Ut sed dui et eros pellentesque imperdiet. Phasellus consectetur lectus tincidunt nibh aliquam consectetur. Curabitur tempor viverra efficitur. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed nulla felis, lacinia non nisl in, ornare posuere elit. Sed ut enim sed urna accumsan elementum vitae in enim. Nullam ornare porta quam, id ornare velit consequat quis. Maecenas hendrerit fermentum mauris, sit amet dignissim mi faucibus at. Curabitur erat tortor, fermentum laoreet elementum eget, viverra a diam. In elementum hendrerit quam sit amet facilisis. Praesent cursus purus non placerat lobortis. Cras ut ullamcorper arcu. Integer placerat hendrerit venenatis. Curabitur porta iaculis iaculis. Pellentesque non consequat sapien.','CDI','Paris',1,1,'2019-02-11','2018-12-11','2018-12-11',12),(89,'Technicien','Mauris est enim, gravida ac elit id, bibendum blandit ipsum. Maecenas in ullamcorper lectus. Sed tincidunt nisi nunc, sed gravida urna sagittis vitae. Proin feugiat nisi nibh. Vivamus scelerisque tempus tortor ut rhoncus. Cras tempor ligula nec nibh lobortis, eu tincidunt purus scelerisque. Sed vitae libero commodo urna finibus auctor et in lectus. Nam hendrerit eleifend arcu. Praesent lacinia leo a quam commodo, eget mollis ligula bibendum. Nulla scelerisque laoreet justo vitae pretium.','CDD','Nantes',1,1,'2019-02-11','2018-12-11','2018-12-11',12),(90,'Manager','Mauris est enim, gravida ac elit id, bibendum blandit ipsum. Maecenas in ullamcorper lectus. Sed tincidunt nisi nunc, sed gravida urna sagittis vitae. Proin feugiat nisi nibh. Vivamus scelerisque tempus tortor ut rhoncus. Cras tempor ligula nec nibh lobortis, eu tincidunt purus scelerisque. Sed vitae libero commodo urna finibus auctor et in lectus. Nam hendrerit eleifend arcu. Praesent lacinia leo a quam commodo, eget mollis ligula bibendum. Nulla scelerisque laoreet justo vitae pretium.','Stage','Lille',1,1,'2019-02-11','2018-12-11','2018-12-11',12),(91,'Manager','Mauris est enim, gravida ac elit id, bibendum blandit ipsum. Maecenas in ullamcorper lectus. Sed tincidunt nisi nunc, sed gravida urna sagittis vitae. Proin feugiat nisi nibh. Vivamus scelerisque tempus tortor ut rhoncus. Cras tempor ligula nec nibh lobortis, eu tincidunt purus scelerisque. Sed vitae libero commodo urna finibus auctor et in lectus. Nam hendrerit eleifend arcu. Praesent lacinia leo a quam commodo, eget mollis ligula bibendum. Nulla scelerisque laoreet justo vitae pretium.','Stage','Paris',1,1,'2019-02-11','2018-12-11','2018-12-11',12),(92,'Manager','Mauris est enim, gravida ac elit id, bibendum blandit ipsum. Maecenas in ullamcorper lectus. Sed tincidunt nisi nunc, sed gravida urna sagittis vitae. Proin feugiat nisi nibh. Vivamus scelerisque tempus tortor ut rhoncus. Cras tempor ligula nec nibh lobortis, eu tincidunt purus scelerisque. Sed vitae libero commodo urna finibus auctor et in lectus. Nam hendrerit eleifend arcu. Praesent lacinia leo a quam commodo, eget mollis ligula bibendum. Nulla scelerisque laoreet justo vitae pretium.','CDI','Paris',1,1,'2019-02-11','2018-12-11','2018-12-11',12),(93,'Developpeur Backend','Duis euismod sit amet purus eu fringilla. Mauris sed semper eros. Sed eu leo id augue aliquet condimentum. Cras sit amet iaculis augue, a posuere diam. Mauris pulvinar facilisis dolor et consequat. Vivamus sed purus tempor, tincidunt massa et, elementum turpis. Etiam vehicula turpis a odio tincidunt laoreet. Donec a dolor tellus. Vivamus imperdiet vehicula laoreet.','CDI','Paris',1,1,'2019-02-11','2018-12-11','2018-12-11',13),(94,'Developpeur Backend','Duis euismod sit amet purus eu fringilla. Mauris sed semper eros. Sed eu leo id augue aliquet condimentum. Cras sit amet iaculis augue, a posuere diam. Mauris pulvinar facilisis dolor et consequat. Vivamus sed purus tempor, tincidunt massa et, elementum turpis. Etiam vehicula turpis a odio tincidunt laoreet. Donec a dolor tellus. Vivamus imperdiet vehicula laoreet.','CDD','Paris',1,1,'2019-02-11','2018-12-11','2018-12-11',13),(95,'Developpeur Backend','Duis euismod sit amet purus eu fringilla. Mauris sed semper eros. Sed eu leo id augue aliquet condimentum. Cras sit amet iaculis augue, a posuere diam. Mauris pulvinar facilisis dolor et consequat. Vivamus sed purus tempor, tincidunt massa et, elementum turpis. Etiam vehicula turpis a odio tincidunt laoreet. Donec a dolor tellus. Vivamus imperdiet vehicula laoreet.','Stage','Paris',1,1,'2019-02-11','2018-12-11','2018-12-11',13),(96,'Developpeur Frontend','Duis euismod sit amet purus eu fringilla. Mauris sed semper eros. Sed eu leo id augue aliquet condimentum. Cras sit amet iaculis augue, a posuere diam. Mauris pulvinar facilisis dolor et consequat. Vivamus sed purus tempor, tincidunt massa et, elementum turpis. Etiam vehicula turpis a odio tincidunt laoreet. Donec a dolor tellus. Vivamus imperdiet vehicula laoreet.','Stage','Toulouse',1,1,'2019-02-11','2018-12-11','2018-12-11',13),(97,'Developpeur Frontend','Duis euismod sit amet purus eu fringilla. Mauris sed semper eros. Sed eu leo id augue aliquet condimentum. Cras sit amet iaculis augue, a posuere diam. Mauris pulvinar facilisis dolor et consequat. Vivamus sed purus tempor, tincidunt massa et, elementum turpis. Etiam vehicula turpis a odio tincidunt laoreet. Donec a dolor tellus. Vivamus imperdiet vehicula laoreet.','CDD','Toulouse',1,1,'2019-02-11','2018-12-11','2018-12-11',13),(98,'Lead Dev','Duis euismod sit amet purus eu fringilla. Mauris sed semper eros. Sed eu leo id augue aliquet condimentum. Cras sit amet iaculis augue, a posuere diam. Mauris pulvinar facilisis dolor et consequat. Vivamus sed purus tempor, tincidunt massa et, elementum turpis. Etiam vehicula turpis a odio tincidunt laoreet. Donec a dolor tellus. Vivamus imperdiet vehicula laoreet.','CDI','Toulouse',1,1,'2019-02-11','2018-12-11','2018-12-11',13),(99,'Lead Dev','Duis euismod sit amet purus eu fringilla. Mauris sed semper eros. Sed eu leo id augue aliquet condimentum. Cras sit amet iaculis augue, a posuere diam. Mauris pulvinar facilisis dolor et consequat. Vivamus sed purus tempor, tincidunt massa et, elementum turpis. Etiam vehicula turpis a odio tincidunt laoreet. Donec a dolor tellus. Vivamus imperdiet vehicula laoreet.','CDI','Paris',1,1,'2019-02-11','2018-12-11','2018-12-11',13),(100,'Marketing manager','Integer cursus quis tellus nec efficitur. Quisque iaculis, enim in pharetra suscipit, dui sapien mollis ipsum, in tristique ante arcu semper neque. Quisque quis urna odio. Sed aliquet risus id odio mollis faucibus. Vivamus congue dolor tellus, in faucibus nulla aliquet vitae. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum pretium tincidunt finibus. Mauris euismod congue dolor, vitae aliquam mi porttitor et.','CDI','Paris',1,1,'2019-02-11','2018-12-11','2018-12-11',13),(101,'Marketing manager','Integer cursus quis tellus nec efficitur. Quisque iaculis, enim in pharetra suscipit, dui sapien mollis ipsum, in tristique ante arcu semper neque. Quisque quis urna odio. Sed aliquet risus id odio mollis faucibus. Vivamus congue dolor tellus, in faucibus nulla aliquet vitae. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum pretium tincidunt finibus. Mauris euismod congue dolor, vitae aliquam mi porttitor et.','CDI','Strasbourg',1,1,'2019-02-11','2018-12-11','2018-12-11',13),(102,'Marketing manager','Integer cursus quis tellus nec efficitur. Quisque iaculis, enim in pharetra suscipit, dui sapien mollis ipsum, in tristique ante arcu semper neque. Quisque quis urna odio. Sed aliquet risus id odio mollis faucibus. Vivamus congue dolor tellus, in faucibus nulla aliquet vitae. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum pretium tincidunt finibus. Mauris euismod congue dolor, vitae aliquam mi porttitor et.','CDI','Aast',1,1,'2019-02-11','2018-12-11','2018-12-11',12);
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
INSERT INTO `offers_questions` VALUES (85,1),(85,2),(85,3),(85,4),(85,5),(85,6),(86,1),(86,2),(86,5),(86,6),(87,1),(87,2),(87,5),(87,3),(88,1),(88,2),(88,5),(88,3),(89,1),(89,2),(89,5),(89,3),(90,1),(90,2),(90,5),(90,3),(91,1),(91,2),(91,5),(91,3),(92,1),(92,2),(92,5),(92,3),(93,1),(93,2),(93,5),(93,3),(94,1),(94,2),(94,5),(94,3),(95,1),(95,2),(95,5),(95,3),(96,1),(96,2),(96,5),(96,3),(97,1),(97,2),(97,5),(97,3),(98,1),(98,2),(98,5),(98,3),(99,1),(99,2),(99,5),(99,3),(100,1),(100,2),(100,5),(100,3),(101,1),(101,2),(101,5),(101,3),(102,1),(102,2),(102,5),(102,3);
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
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (1,'Une réalisation, perso ou pro, dont vous êtes fier-e et qui servirait pour ce job.',0,'2018-11-23','2018-11-23'),(2,'A votre avis, qu’est-ce qui pourrait être amélioré dans notre entreprise ?',0,'2018-11-23','2018-11-23'),(3,'Quel a été votre « plus bel échec » ?',0,'2018-11-23','2018-11-23'),(4,'Trois mois après votre embauche, on fait le point. Et voilà ce que vous avez apporté…',0,'2018-11-23','2018-11-23'),(5,'Pour vous, être heureux dans son travail, c’est quoi ? Le salaire ? L’équipe ? La possibilité d’évoluer ? La machine à café ?',0,'2018-11-23','2018-11-23'),(6,'Vous avez quelque chose à nous dire, un élément à nous envoyer pour nous convaincre ? Allez-y !',0,'2018-11-23','2018-11-23');
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

-- Dump completed on 2018-12-11 14:53:27
