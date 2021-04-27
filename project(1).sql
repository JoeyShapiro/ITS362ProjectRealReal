-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 27, 2021 at 05:43 PM
-- Server version: 5.7.33-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project`
--

-- --------------------------------------------------------

--
-- Table structure for table `beanAchievements`
--

CREATE TABLE `beanAchievements` (
  `username` varchar(20) NOT NULL,
  `beans100` tinyint(1) NOT NULL DEFAULT '0',
  `beans1000` tinyint(1) NOT NULL DEFAULT '0',
  `addictionBegins` tinyint(1) NOT NULL DEFAULT '0',
  `coffeeDependent` tinyint(1) NOT NULL DEFAULT '0',
  `coffeeAddict` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `beanAchievements`
--

INSERT INTO `beanAchievements` (`username`, `beans100`, `beans1000`, `addictionBegins`, `coffeeDependent`, `coffeeAddict`) VALUES
('test', 1, 0, 1, 0, 0),
('test', 1, 0, 1, 0, 0),
('yoey', 0, 0, 1, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `beanClicker`
--

CREATE TABLE `beanClicker` (
  `username` varchar(20) NOT NULL,
  `currentBeans` float NOT NULL DEFAULT '0',
  `totalBeans` float NOT NULL DEFAULT '0',
  `farms` int(255) NOT NULL DEFAULT '0',
  `plantations` int(255) NOT NULL DEFAULT '0',
  `upgradedFarms` int(255) NOT NULL DEFAULT '0',
  `upgradedPlantations` int(255) NOT NULL DEFAULT '0',
  `coffeeBeansUsed` int(255) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `beanClicker`
--

INSERT INTO `beanClicker` (`username`, `currentBeans`, `totalBeans`, `farms`, `plantations`, `upgradedFarms`, `upgradedPlantations`, `coffeeBeansUsed`) VALUES
('test', 50, 100, 0, 0, 0, 0, 1),
('yoey', 7, 57, 0, 0, 0, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `id` int(8) NOT NULL,
  `name` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`id`, `name`) VALUES
(1, 'HackingGame'),
(2, 'BeanClicker'),
(3, 'SportsQuiz');

-- --------------------------------------------------------

--
-- Table structure for table `leaderboard`
--

CREATE TABLE `leaderboard` (
  `id` int(8) NOT NULL,
  `gid` int(8) NOT NULL,
  `uid` int(8) NOT NULL,
  `score` int(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `leaderboard`
--

INSERT INTO `leaderboard` (`id`, `gid`, `uid`, `score`) VALUES
(1, 1, 4, 0),
(2, 1, 3, -2),
(3, 3, 3, 100),
(4, 1, 3, 1),
(5, 3, 3, 30),
(6, 1, 3, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(8) NOT NULL,
  `username` varchar(16) NOT NULL,
  `password` varbinary(32) NOT NULL,
  `email` varchar(20) NOT NULL,
  `birth` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `birth`) VALUES
(1, 'admin', 0x61646d696e, '', ''),
(2, 'test', 0x74657374, 'test', 'test'),
(3, 'yoey', 0x373cc3eccdf4129918c3d1dfa62db75816316388989f53f62213f569f290198f, 'yoey', 'test'),
(4, 'Alice', 0x6a5310fe5967cd8391f38e72c1e415bfd2d685e3411e1f11927529b04c340408, 'alice@example.com', '2021-04-26'),
(5, 'test2', 0x373cc3eccdf4129918c3d1dfa62db75816316388989f53f62213f569f290198f, 'email@email.com', '2021-04-14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `beanAchievements`
--
ALTER TABLE `beanAchievements`
  ADD KEY `userID` (`username`);

--
-- Indexes for table `beanClicker`
--
ALTER TABLE `beanClicker`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leaderboard`
--
ALTER TABLE `leaderboard`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `games`
--
ALTER TABLE `games`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `leaderboard`
--
ALTER TABLE `leaderboard`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `beanAchievements`
--
ALTER TABLE `beanAchievements`
  ADD CONSTRAINT `beanAchievements_ibfk_1` FOREIGN KEY (`username`) REFERENCES `beanClicker` (`username`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
