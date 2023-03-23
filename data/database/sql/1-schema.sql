CREATE DATABASE IF NOT EXISTS directus;

USE directus;

CREATE TABLE IF NOT EXISTS categories (
    id INT PRIMARY KEY,
    libelle VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS sandwiches (
    id INT PRIMARY KEY,
    libelle VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    prix DECIMAL(8,5) NOT NULL,
    id_category INT NOT NULL,
    FOREIGN KEY (id_category) REFERENCES categories(id)
);
