FROM php:8.2-apache-bullseye

RUN docker-php-ext-install mysqli
RUN docker-php-ext-enable mysqli
RUN apt-get update && apt-get install -y default-mysql-client
RUN apt-get install -y nano

# Copiar los archivos del sitio web al directorio del sitio en el contenedor
COPY . /var/www/html/






