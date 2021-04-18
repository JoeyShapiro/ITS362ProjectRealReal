-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 18, 2021 at 01:08 AM
-- Server version: 5.7.33-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `FinalProject`
--

-- --------------------------------------------------------

--
-- Table structure for table `beanAchievements`
--

CREATE TABLE `beanAchievements` (
  `userID` varchar(20) NOT NULL,
  `beans100` tinyint(1) NOT NULL DEFAULT '0',
  `beans1000` tinyint(1) NOT NULL DEFAULT '0',
  `addictionBegins` tinyint(1) NOT NULL DEFAULT '0',
  `coffeeDependent` tinyint(1) NOT NULL DEFAULT '0',
  `coffeeAddict` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `beanAchievements`
--

INSERT INTO `beanAchievements` (`userID`, `beans100`, `beans1000`, `addictionBegins`, `coffeeDependent`, `coffeeAddict`) VALUES
('ryan', 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `beanClicker`
--

CREATE TABLE `beanClicker` (
  `userID` varchar(20) NOT NULL,
  `currentBeans` float NOT NULL DEFAULT '0',
  `totalBeans` float NOT NULL DEFAULT '0',
  `beansPerSecond` float NOT NULL DEFAULT '0',
  `farms` int(255) NOT NULL DEFAULT '0',
  `plantations` int(255) NOT NULL DEFAULT '0',
  `upgradedFarms` int(255) NOT NULL DEFAULT '0',
  `upgradedPlantations` int(255) NOT NULL DEFAULT '0',
  `coffeeBeansUsed` int(255) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `beanClicker`
--

INSERT INTO `beanClicker` (`userID`, `currentBeans`, `totalBeans`, `beansPerSecond`, `farms`, `plantations`, `upgradedFarms`, `upgradedPlantations`, `coffeeBeansUsed`) VALUES
('ryan', 3, 3, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `id` int(8) NOT NULL,
  `name` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
(3, 'yoey', 0x373cc3eccdf4129918c3d1dfa62db75816316388989f53f62213f569f290198f, 'yoey', 'test');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `beanAchievements`
--
ALTER TABLE `beanAchievements`
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `beanClicker`
--
ALTER TABLE `beanClicker`
  ADD PRIMARY KEY (`userID`);

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
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `leaderboard`
--
ALTER TABLE `leaderboard`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `beanAchievements`
--
ALTER TABLE `beanAchievements`
  ADD CONSTRAINT `beanAchievements_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `beanClicker` (`userID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
