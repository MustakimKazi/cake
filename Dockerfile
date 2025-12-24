# ---------- Stage 1: Build ----------
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN node server.js

RUN npm run build


EXPOSE 80

# ---------- Nginx Serve ----------

    FROM nginx:1.29.4-alpine
    WORKDIR /usr/share/nginx/html
    RUN rm -rf ./*
    COPY --from=builder /app/build .

 CMD ["nginx", "-g", "daemon off;"]

