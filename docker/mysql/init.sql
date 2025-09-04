-- Crear base de datos si no existe
CREATE DATABASE IF NOT EXISTS servicestationdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Usar la base de datos
USE servicestationdb;

-- Crear tabla clients
CREATE TABLE IF NOT EXISTS clients (
  client_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  dni VARCHAR(20) NOT NULL UNIQUE,
  age INT NOT NULL
);

-- Crear tabla employeds
CREATE TABLE IF NOT EXISTS employeds (
  employed_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  dni VARCHAR(20) NOT NULL UNIQUE,
  employed_password VARCHAR(255) NOT NULL
);

-- Crear tabla purchases
CREATE TABLE IF NOT EXISTS purchases (
  purchase_id INT AUTO_INCREMENT PRIMARY KEY,
  client INT NOT NULL,
  employed INT NOT NULL,
  purchase_date DATE NOT NULL,
  description VARCHAR(255) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  CONSTRAINT fk_client FOREIGN KEY (client) REFERENCES clients(client_id),
  CONSTRAINT fk_employed FOREIGN KEY (employed) REFERENCES employeds(employed_id)
);
