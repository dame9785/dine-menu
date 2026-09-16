-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: dinemenu
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `Category` VALUES (4,'Meat','2026-09-10 06:30:59.960','2026-09-11 10:24:25.996'),(17,'Pizza','2026-09-10 08:21:25.200','2026-09-10 09:00:42.505'),(18,'Pasta','2026-09-10 08:21:28.134','2026-09-10 09:00:23.542'),(20,'Kyckling','2026-09-11 08:42:49.026','2026-09-11 08:42:49.026'),(21,'Burger','2026-09-12 10:52:38.531','2026-09-12 10:52:38.531'),(27,'Nuggets','2026-09-16 10:52:30.366','2026-09-16 10:52:30.366');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `menuitem`
--

LOCK TABLES `menuitem` WRITE;
/*!40000 ALTER TABLE `menuitem` DISABLE KEYS */;
INSERT INTO `MenuItem` VALUES (3,'Chickentariaki','Best chicken ever!',80.000000000000000000000000000000,'/img/foods/6c6cbf78-9eab-482c-867e-877548eb33b2.jpg',20,'2026-09-11 09:55:22.497','2026-09-11 09:55:22.497'),(5,'Pizza margarita','Margarita',80.000000000000000000000000000000,'/img/foods/d9e1d5c6-f780-41c9-89b9-9fa6a10bb041.png',17,'2026-09-11 10:21:54.867','2026-09-15 17:14:49.479'),(6,'oxfile','Oxfile',90.000000000000000000000000000000,'/img/foods/b9dc89ad-882d-4216-a76e-2ae4dcb70bd0.jpg',4,'2026-09-11 10:24:15.960','2026-09-11 10:24:15.960'),(7,'Pasta sallad','Very very tast sallad',80.000000000000000000000000000000,'/img/foods/e6da8631-c78f-4151-a2c0-db2c194d9609.jpg',18,'2026-09-11 11:35:00.119','2026-09-11 11:35:00.119'),(9,'Chicken stew','Best chicken stew',80.000000000000000000000000000000,'/img/foods/131be075-7a28-4e21-ae26-f5408346c63f.webp',20,'2026-09-11 11:39:10.922','2026-09-11 11:39:10.922'),(10,'Pasta bolognese','Best pasta bolognese',80.000000000000000000000000000000,'/img/foods/ad4fc1e6-11cc-4301-9854-7f3866ad7c0a.jpg',18,'2026-09-11 11:40:02.052','2026-09-11 11:40:02.052'),(11,'Creamy Chicken Pasta','Creamy pasta with grilled chicken, garlic, parmesan and fresh herbs.',149.000000000000000000000000000000,'/img/foods/e4ab5bd8-40a3-473f-ab1a-660e5414e188.webp',18,'2026-09-12 10:49:15.331','2026-09-12 10:49:15.331'),(12,'Spicy Tomato Pasta','Pasta with spicy tomato sauce, chili and fresh basil.',129.000000000000000000000000000000,'/img/foods/5cfd6985-c303-4509-a254-c8efca6797a8.jpg',18,'2026-09-12 10:50:03.324','2026-09-12 10:50:03.324'),(13,'Truffle Mushroom Pasta','Tagliatelle with creamy mushroom sauce and truffle oil.',169.000000000000000000000000000000,'/img/foods/a7e22d2b-994b-4c0d-9996-c2fb5c355c0d.jpg',18,'2026-09-12 10:50:25.396','2026-09-12 10:50:25.396'),(14,'Chicken Caesar Salad','Fresh salad with grilled chicken, parmesan and Caesar dressing.',80.000000000000000000000000000000,'/img/foods/13a21939-8584-4773-8d40-d1db8b9674a4.jpg',18,'2026-09-12 10:50:45.927','2026-09-12 10:50:45.927'),(15,'Margherita Pizza','Classic pizza with tomato sauce, mozzarella and fresh basil.',80.000000000000000000000000000000,'/img/foods/ecac4d09-4c03-46f5-8001-7a8d438e3d79.jpg',17,'2026-09-12 10:51:33.762','2026-09-12 10:51:33.762'),(16,'Pepperoni Pizza','Crispy pizza topped with spicy pepperoni and melted mozzarella.',90.000000000000000000000000000000,'/img/foods/5fbefb5f-e533-4c28-b453-370c94c13157.webp',17,'2026-09-12 10:52:17.047','2026-09-12 10:52:17.047'),(17,'Beef Burger','Juicy beef burger with cheddar, lettuce, tomato and burger sauce.',102.000000000000000000000000000000,'/img/foods/1002e52e-eb9b-4fa4-9878-299f842bd3d6.jpg',21,'2026-09-12 10:52:58.823','2026-09-12 10:52:58.823'),(18,'Garlic Butter Shrimp Pasta','Spaghetti with garlic butter shrimp, lemon and fresh parsley.',104.000000000000000000000000000000,'/img/foods/42d345f9-62ed-4234-b135-4c1d59df80aa.jpg',18,'2026-09-12 10:53:39.942','2026-09-12 10:53:39.942'),(19,'Grilled Chicken Sandwich','Grilled chicken breast with lettuce, tomato and garlic mayo.',200.000000000000000000000000000000,'/img/foods/da4ebc0f-eab1-4bc0-81d2-74d76e0eddbe.jpg',20,'2026-09-12 10:54:23.386','2026-09-12 10:54:23.386'),(20,'Chicken pasta','Tasty chicken pasta, you must try!',105.000000000000000000000000000000,'/img/foods/c21d445c-0d4b-43fa-9a65-a19b9c85601d.jpg',18,'2026-09-15 07:31:27.594','2026-09-15 07:31:27.594'),(21,'Swedish  burger','Tasty swedish burger, you must try it!',100.000000000000000000000000000000,'/img/foods/317ac48f-aff2-4730-b39e-718224c7ae35.jpg',21,'2026-09-15 07:45:20.426','2026-09-15 14:22:22.447'),(22,'Mexican burger','Tasty mexican burger, you should try it!',129.000000000000000000000000000000,'/img/foods/3cfdd3cc-7273-42d5-8055-7b27f767ba78.png',21,'2026-09-15 09:04:17.937','2026-09-15 15:24:49.494'),(23,'Kebab','A delicious Italian-style pizza with a crispy golden crust, rich tomato sauce, creamy mozzarella',129.000000000000000000000000000000,'/img/foods/ca6b7c3b-a276-459b-9a74-436095bb15b0.png',21,'2026-09-15 09:20:25.428','2026-09-15 14:30:36.474'),(31,'Margheta pizza','A delicious Italian-style pizza with a crispy golden crust, rich tomato sauce, creamy mozzarella, and flavorful pepperoni. Topped with fresh herbs for a perfect combination of savory, cheesy, and aromatic flavors.',129.000000000000000000000000000000,'/img/foods/19ab26a5-62e2-4c88-9f46-571cb2c8e9a2.png',17,'2026-09-15 11:01:49.622','2026-09-15 14:30:18.306'),(32,'Pizza','A delicious Italian-style pizza with a crispy golden crust, rich tomato sauce, creamy mozzarella, and flavorful pepperoni. Topped with fresh herbs for a perfect combination of savory, cheesy, and aromatic flavors.',50.000000000000000000000000000000,'/img/foods/fa5d0529-7bcb-44e0-a0f3-f7fe3b61788a.png',20,'2026-09-15 12:38:18.783','2026-09-15 14:30:09.508'),(33,'Hamburgare','Very tasty hamburger',255.000000000000000000000000000000,'/img/foods/5b82d224-5a2a-4ada-964d-1b0d0b8a87e3.png',21,'2026-09-15 13:58:48.678','2026-09-15 14:20:15.522'),(34,'Pizza vesuvio','A delicious Italian-style pizza with a crispy golden crust, rich tomato sauce, creamy mozzarella, and flavorful pepperoni. Topped with fresh herbs for a perfect combination of savory, cheesy, and aromatic flavors.',5.000000000000000000000000000000,'/img/foods/e910c8ae-6cb8-4ae7-a4e7-9a22b580d503.png',18,'2026-09-15 14:32:34.004','2026-09-16 11:22:16.287');
/*!40000 ALTER TABLE `menuitem` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-16 14:08:51

