# ---------- Stage 1: Build ----------
FROM node:18 AS Builder

WORKDIR ../cake/server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node" ,  "server.js"]