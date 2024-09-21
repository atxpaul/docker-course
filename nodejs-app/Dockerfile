FROM node:20.16.0-slim

WORKDIR /app

COPY package*.json .
COPY app.js .

RUN npm ci --only=production

EXPOSE 3000

CMD ["node","app.js"]
