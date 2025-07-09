# 1. Imagen base: Node 18 (LTS)
FROM node:18-alpine

# 2. Actualizar Alpine y reducir vulnerabilidades
RUN apk update && apk upgrade --no-cache

# 3. Definir el directorio de trabajo
WORKDIR /usr/src/app

# 4. Copiar los archivos de dependencias e instalar
COPY package*.json ./
RUN npm install --omit=dev

# 5. Copiar el resto de la aplicación
COPY . .

# 6. Exponer el puerto en el que escucha la app
EXPOSE 3000

# 7. Fijar NODE_ENV a producción
ENV NODE_ENV=production

# 8. Comando de arranque
CMD ["node", "src/index.js"]
