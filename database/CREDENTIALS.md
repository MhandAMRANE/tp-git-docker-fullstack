# 🔑 Credentials MySQL pour l'équipe

## Pour le Backend (Node.js)

Voici les informations à mettre dans votre `.env` :

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=car_rental
DB_USER=caruser
DB_PASSWORD=carpass
```

## Pour phpMyAdmin

- **URL**: http://localhost:8080
- **Serveur**: mysql-db
- **Utilisateur**: root
- **Mot de passe**: rootpassword

**OU** avec l'utilisateur dédié :
- **Utilisateur**: caruser
- **Mot de passe**: carpass

## Structure de la Base de Données

### ✅ Base de données
- **Nom**: `car_rental`

### ✅ Table: `cars` (OBLIGATOIRE)
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- brand (VARCHAR(100))
- model (VARCHAR(100))
- year (INT)
- price_per_day (DECIMAL(10,2))
- available (BOOLEAN)
```

### ✅ Table: `clients`
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- nom (VARCHAR(100))
- prenom (VARCHAR(100))
- email (VARCHAR(150))
- telephone (VARCHAR(30))
```

### ✅ Table: `rentals`
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- client_id (INT, FK -> clients.id)
- car_id (INT, FK -> cars.id)
- date_debut (DATE)
- date_fin (DATE)
- prix_total (DECIMAL(10,2))
```

## 🐳 Commandes Docker

```bash
# Lancer la base de données
docker-compose up -d mysql-db phpmyadmin

# Vérifier que ça tourne
docker ps

# Voir les logs
docker logs car-rental-db
```

## 📝 Notes importantes

- ⚠️ **NE PAS** utiliser root en production
- ✅ Utilisateur dédié créé : `caruser` / `carpass`
- ✅ Privilèges limités à la base `car_rental` uniquement
- ✅ Noms des colonnes figés pour compatibilité Frontend/Backend
