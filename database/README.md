# 🗄️ Database - Système de Location de Voitures

## 📋 Structure de la Base de Données

### Table: **voitures**
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- marque (VARCHAR(50))
- modele (VARCHAR(50))
- annee (INT)
- prix_par_jour (DECIMAL(10,2))
- image_url (VARCHAR(255))
- disponible (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Table: **clients**
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- nom (VARCHAR(50))
- prenom (VARCHAR(50))
- email (VARCHAR(100), UNIQUE)
- telephone (VARCHAR(20))
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Table: **locations**
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- client_id (INT, FOREIGN KEY -> clients.id)
- voiture_id (INT, FOREIGN KEY -> voitures.id)
- date_debut (DATE)
- date_fin (DATE)
- prix_total (DECIMAL(10,2))
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

## 🚀 Utilisation

### Avec Docker
```bash
# Construire l'image
docker build -t location-voitures-db ./database

# Lancer le conteneur
docker run -d -p 3306:3306 --name mysql-db location-voitures-db
```

### Avec Docker Compose
```bash
docker-compose up -d
```

## 🔑 Credentials
- **Database**: location_voitures
- **Root Password**: rootpassword
- **User**: user
- **Password**: userpassword
- **Port**: 3306

## 📁 Fichiers

- `init.sql` - Création des tables et de la structure
- `seed.sql` - Données de test
- `Dockerfile` - Configuration Docker pour MySQL
- `README.md` - Documentation

## 🔗 Relations

- `locations.client_id` → `clients.id`
- `locations.voiture_id` → `voitures.id`
