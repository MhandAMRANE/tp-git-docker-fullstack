-- Données de test pour la base de données
USE car_rental;

-- ========================================
-- Données pour la table cars
-- ========================================
INSERT INTO cars (brand, model, year, price_per_day, available) VALUES
('Toyota', 'Corolla', 2023, 45.00, TRUE),
('Honda', 'Civic', 2022, 50.00, TRUE),
('Ford', 'Focus', 2021, 40.00, TRUE),
('BMW', 'Serie 3', 2023, 85.00, TRUE),
('Mercedes', 'Classe A', 2023, 90.00, TRUE),
('Renault', 'Clio', 2022, 35.00, FALSE),
('Peugeot', '308', 2023, 42.00, TRUE),
('Volkswagen', 'Golf', 2022, 48.00, TRUE),
('Audi', 'A4', 2023, 95.00, TRUE),
('Nissan', 'Qashqai', 2022, 55.00, TRUE);

-- ========================================
-- Données pour la table clients
-- ========================================
INSERT INTO clients (nom, prenom, email, telephone) VALUES
('Dupont', 'Jean', 'jean.dupont@email.com', '0601020304'),
('Martin', 'Marie', 'marie.martin@email.com', '0612345678'),
('Bernard', 'Pierre', 'pierre.bernard@email.com', '0623456789'),
('Dubois', 'Sophie', 'sophie.dubois@email.com', '0634567890'),
('Thomas', 'Luc', 'luc.thomas@email.com', '0645678901');

-- ========================================
-- Données pour la table rentals
-- ========================================
INSERT INTO rentals (client_id, car_id, date_debut, date_fin, prix_total) VALUES
(1, 1, '2026-02-10', '2026-02-15', 225.00),
(2, 4, '2026-02-12', '2026-02-14', 170.00),
(3, 7, '2026-02-08', '2026-02-11', 126.00),
(4, 9, '2026-02-20', '2026-02-25', 475.00),
(5, 10, '2026-02-18', '2026-02-21', 165.00);
