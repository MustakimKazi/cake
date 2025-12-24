# ---------- Stage 1: Build ----------
FROM node:20 AS Builder

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5000

ENTRYPOINT [ "node","start" ]