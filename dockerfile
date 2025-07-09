# 1. Imagen base: Node 18 (LTS)
FROM node:18-alpine

# Actualizar paquetes de Alpine packages para reducir vulnerabilidades
RUN apk update && apk upgrade --no-cache

# 2. Crear y definir el directorio de trabajo
WORKDIR /usr/src/app

# 3. Copiar package.json y package-lock.json e instalar dependencias
COPY package*.json ./
RUN npm ci --omit=dev

# 4. Copiar el resto del código
COPY . .

# 5. Exponer el puerto definido en .env (3000)
EXPOSE 3000

# 6. Definir la variable de entorno de producción
ENV NODE_ENV=production

# 7. Comando de arranque
CMD ["node", "src/index.js"]
