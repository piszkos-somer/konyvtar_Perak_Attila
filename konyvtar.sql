-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1:3307
-- Létrehozás ideje: 2025. Dec 09. 12:48
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `konyvtar`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kolcsonzes`
--

CREATE TABLE `kolcsonzes` (
  `kolcsonzes_id` int(11) NOT NULL,
  `nev` varchar(100) NOT NULL,
  `osztaly` varchar(50) DEFAULT NULL,
  `datum` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `kolcsonzes`
--

INSERT INTO `kolcsonzes` (`kolcsonzes_id`, `nev`, `osztaly`, `datum`) VALUES
(1, 'Kiss Péter', '10.A', '2025-02-10'),
(2, 'Nagy Anna', '11.B', '2025-02-12'),
(3, 'Tóth Lilla', '9.C', '2025-02-15');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `konyvek`
--

CREATE TABLE `konyvek` (
  `konyv_id` int(11) NOT NULL,
  `szerzo` varchar(100) NOT NULL,
  `cim` varchar(200) NOT NULL,
  `mufaj` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `konyvek`
--

INSERT INTO `konyvek` (`konyv_id`, `szerzo`, `cim`, `mufaj`) VALUES
(1, 'J. K. Rowling', 'Harry Potter és a Bölcsek Köve', 'Fantasy'),
(2, 'George Orwell', '1984', 'Disztópia'),
(3, 'J. R. R. Tolkien', 'A Gyűrűk Ura', 'Fantasy'),
(4, 'Fekete István', 'Tüskevár', 'Ifjúsági'),
(5, 'Agatha Christie', 'Tíz kicsi néger', 'Krimi');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `konyvek_kolcsonzes`
--

CREATE TABLE `konyvek_kolcsonzes` (
  `konyv_kolcsonzes_id` int(11) NOT NULL,
  `kolcsonzes_id` int(11) NOT NULL,
  `konyv_id` int(11) NOT NULL,
  `datum` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `konyvek_kolcsonzes`
--

INSERT INTO `konyvek_kolcsonzes` (`konyv_kolcsonzes_id`, `kolcsonzes_id`, `konyv_id`, `datum`) VALUES
(1, 1, 1, '2025-02-10'),
(2, 1, 4, '2025-02-10'),
(3, 2, 2, '2025-02-12'),
(4, 2, 5, '2025-02-12'),
(5, 3, 3, '2025-02-15');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `kolcsonzes`
--
ALTER TABLE `kolcsonzes`
  ADD PRIMARY KEY (`kolcsonzes_id`);

--
-- A tábla indexei `konyvek`
--
ALTER TABLE `konyvek`
  ADD PRIMARY KEY (`konyv_id`);

--
-- A tábla indexei `konyvek_kolcsonzes`
--
ALTER TABLE `konyvek_kolcsonzes`
  ADD PRIMARY KEY (`konyv_kolcsonzes_id`),
  ADD KEY `kolcsonzes_id` (`kolcsonzes_id`),
  ADD KEY `konyv_id` (`konyv_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `kolcsonzes`
--
ALTER TABLE `kolcsonzes`
  MODIFY `kolcsonzes_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `konyvek`
--
ALTER TABLE `konyvek`
  MODIFY `konyv_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `konyvek_kolcsonzes`
--
ALTER TABLE `konyvek_kolcsonzes`
  MODIFY `konyv_kolcsonzes_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `konyvek_kolcsonzes`
--
ALTER TABLE `konyvek_kolcsonzes`
  ADD CONSTRAINT `konyvek_kolcsonzes_ibfk_1` FOREIGN KEY (`kolcsonzes_id`) REFERENCES `kolcsonzes` (`kolcsonzes_id`),
  ADD CONSTRAINT `konyvek_kolcsonzes_ibfk_2` FOREIGN KEY (`konyv_id`) REFERENCES `konyvek` (`konyv_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
