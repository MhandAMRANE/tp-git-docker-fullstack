# Database

## Structure de la Base de Donnees

Base: car_rental

### Tables

**cars**
- id (INT, PRIMARY KEY)
- brand (VARCHAR)
- model (VARCHAR)
- year (INT)
- price_per_day (DECIMAL)
- available (BOOLEAN)

**clients**
- id (INT, PRIMARY KEY)
- nom (VARCHAR)
- prenom (VARCHAR)
- email (VARCHAR)
- telephone (VARCHAR)

**rentals**
- id (INT, PRIMARY KEY)
- client_id (INT, FOREIGN KEY)
- car_id (INT, FOREIGN KEY)
- date_debut (DATE)
- date_fin (DATE)
- prix_total (DECIMAL)

## Utilisation

Lancer avec Docker Compose:
```
docker-compose up -d mysql-db phpmyadmin
```

Configuration MySQL:
- Database: car_rental
- User: caruser
- Password: carpass
- Port: 3306

phpMyAdmin: http://localhost:8080
