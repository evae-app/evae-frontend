# Utiliser une image de base Node.js
FROM node:alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json (ou yarn.lock) dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port sur lequel l'application va s'exécuter
EXPOSE 3000

# Lancer l'application
CMD ["npm", "start"]

