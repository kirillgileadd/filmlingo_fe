# Stage 1: Build application
FROM node:22 AS builder
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем исходный код и билдим проект
COPY . .
RUN npm run build

# Stage 2: Runtime
FROM node:22
WORKDIR /app

# Копируем собранное приложение из Stage 1
COPY --from=builder /app ./

# Указываем порт и стартуем сервер Next.js
ENV PORT=3000
EXPOSE 3000
CMD ["npm", "run", "start"]
