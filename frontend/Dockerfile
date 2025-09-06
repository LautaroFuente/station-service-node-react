# Etapa 1: Build
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Servir con Nginx
FROM nginx:alpine

# Copiamos el build de React al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html


# Copiamos nuestra config de Nginx para que reemplace la default
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponemos puerto 80
EXPOSE 80

# Arrancamos nginx
CMD ["nginx", "-g", "daemon off;"]
