# Image officielle Node.js
FROM node:20-alpine

# Dossier de travail dans le container
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le reste du backend
COPY . .

# Exposer le port de l’API
EXPOSE 3000

# Lancer le serveur
CMD ["npm", "run", "dev"]
