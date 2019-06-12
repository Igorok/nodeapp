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
# docker run -p 8080:8080 -d --name nodeapp dns/nodeapp:v1


# docker ps -a
# docker rm ***
# docker images
# docker rmi ***
# sudo docker logs ***


# Install kubectl binary with curl on Linux

# curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl
# chmod +x ./kubectl
# sudo mv ./kubectl /usr/local/bin/kubectl
# kubectl version
# kubectl cluster-info

# Install Minikube

# To check if virtualization is supported on Linux
# egrep --color 'vmx|svm' /proc/cpuinfo
# curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 \
#   && chmod +x minikube
# sudo install minikube /usr/local/bin
# minikube start

# Create a Minikube cluster

# minikube dashboard
# kubectl create deployment hello-node --image=gcr.io/hello-minikube-zero-install/hello-node
# kubectl get deployments
# kubectl get pods
# kubectl get events
# kubectl config view

# Create a Service

# kubectl expose deployment hello-node --type=LoadBalancer --port=8080
# kubectl get services
# minikube service hello-node

# Enable addons

# minikube addons list
# kubectl get pod,svc -n kube-system

# Clean up

# kubectl delete service hello-node
# kubectl delete deployment hello-node

# minikube stop
# minikube delete

