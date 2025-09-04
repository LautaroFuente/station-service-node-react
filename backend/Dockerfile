# Usamos Node LTS (20.x por ejemplo)
FROM node:20-alpine

# Creamos directorio de la app
WORKDIR /usr/src/app

# Copiamos package.json y package-lock.json
COPY package*.json ./

# Instalamos dependencias
RUN npm install --production

# Copiamos el resto del código
COPY . .

# Exponemos el puerto del backend (ajusta si tu server.js usa otro)
EXPOSE 3000

# Comando de inicio
CMD ["npm", "start"]
