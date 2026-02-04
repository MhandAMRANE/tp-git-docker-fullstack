FROM mysql:8.0

# Variables d'environnement
ENV MYSQL_DATABASE=car_rental
ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV MYSQL_USER=caruser
ENV MYSQL_PASSWORD=carpass

# Copier les scripts SQL
COPY init.sql /docker-entrypoint-initdb.d/01-init.sql
COPY seed.sql /docker-entrypoint-initdb.d/02-seed.sql

# Exposer le port MySQL
EXPOSE 3306
