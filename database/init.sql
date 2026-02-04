-- Base de données pour le système de location de voitures
-- Création de la base de données
CREATE DATABASE IF NOT EXISTS car_rental;
USE car_rental;

-- ========================================
-- Table: cars (OBLIGATOIRE - Frontend dépend de ça)
-- ⚠️ LES NOMS DES COLONNES SONT CRITIQUES
-- ========================================
CREATE TABLE IF NOT EXISTS cars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    price_per_day DECIMAL(10, 2) NOT NULL,
    available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ========================================
-- Table: clients (OPTIONNEL mais recommandé)
-- ========================================
CREATE TABLE IF NOT EXISTS clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    email VARCHAR(150) UNIQUE,
    telephone VARCHAR(30),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ========================================
-- Table: rentals (OPTIONNEL - Locations)
-- ========================================
CREATE TABLE IF NOT EXISTS rentals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT,
    car_id INT,
    date_debut DATE,
    date_fin DATE,
    prix_total DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
    FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
);

-- ========================================
-- Créer l'utilisateur MySQL dédié (PAS ROOT)
-- ========================================
CREATE USER IF NOT EXISTS 'caruser'@'%' IDENTIFIED BY 'carpass';
GRANT ALL PRIVILEGES ON car_rental.* TO 'caruser'@'%';
FLUSH PRIVILEGES;

-- ========================================
-- Index pour améliorer les performances
-- ========================================
CREATE INDEX idx_cars_available ON cars(available);
CREATE INDEX idx_clients_email ON clients(email);
CREATE INDEX idx_rentals_dates ON rentals(date_debut, date_fin);
