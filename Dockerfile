# Используйте официальный образ Node.js
FROM node:14

# Установите рабочую директорию в контейнере
WORKDIR /usr/src/app

# Скопируйте зависимости и файлы приложения в рабочую директорию
COPY package*.json ./

# Установите зависимости
RUN npm install

# Скопируйте остальные файлы приложения
COPY . .

# Укажите порт, который будет использоваться вашим приложением
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "start"]
