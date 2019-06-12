# instal docker
# docker pull node

FROM node:10

# Папка приложения
ARG APP_DIR=app
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

# Установка зависимостей
COPY package*.json ./
RUN npm install
# Для использования в продакшне
# RUN npm install --production

# Копирование файлов проекта
COPY . .

# Уведомление о порте, который будет прослушивать работающее приложение
EXPOSE 8080

# Запуск проекта
CMD ["npm", "start"]


# docker build --build-arg <build arguments> -t <user-name>/<image-name>:<tag-name> /path/to/Dockerfile
# docker build --build-arg APP_DIR=var/app -t dns/nodeapp:v1 .

# docker images

# docker run -p <External-port:exposed-port> -d --name <name of the container> <user-name>/<image-name>:<tag-name>
# docker run -p 3000:8080 -d --name nodeapp dns/nodeapp:v1


# docker ps -a
# docker rm ***
# docker images
# docker rmi ***
# sudo docker logs ***