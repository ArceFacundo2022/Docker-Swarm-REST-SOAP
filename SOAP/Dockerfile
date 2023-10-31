# Utiliza una imagen de Node.js como base
FROM node:18-alpine

# Establece un directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json para gestionar las dependencias
COPY package*.json /app/

# Instala las dependencias
RUN npm install

# Copia todo el código fuente de la aplicación al contenedor
COPY . /app/

# Expone el puerto en el que la aplicación escuchará (por defecto, el puerto 3000 para Express.js)
EXPOSE 3555

# Comando para iniciar la aplicación cuando el contenedor se ejecute
CMD [ "npm", "run", "dev" ]