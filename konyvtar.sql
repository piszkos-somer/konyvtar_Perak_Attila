
CREATE DATABASE IF NOT EXISTS konyvtar;
USE konyvtar;

CREATE TABLE konyvek (
    konyv_id INT AUTO_INCREMENT PRIMARY KEY,
    szerzo VARCHAR(100) NOT NULL,
    cim VARCHAR(200) NOT NULL,
    mufaj VARCHAR(100)
);

CREATE TABLE kolcsonzes (
    kolcsonzes_id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(100) NOT NULL,
    osztaly VARCHAR(50),
    datum DATE NOT NULL
);

CREATE TABLE konyvek_kolcsonzes (
    konyv_kolcsonzes_id INT AUTO_INCREMENT PRIMARY KEY,
    kolcsonzes_id INT NOT NULL,
    konyv_id INT NOT NULL,
    datum DATE NOT NULL,

    FOREIGN KEY (kolcsonzes_id) REFERENCES kolcsonzes(kolcsonzes_id),
    FOREIGN KEY (konyv_id) REFERENCES konyvek(konyv_id)
);
