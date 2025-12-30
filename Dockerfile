# ---------- Stage 1: Build ----------
FROM node:lts-alpine3.23 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .


RUN npm run build


EXPOSE 4000

# ---------- Nginx Serve ----------

FROM nginx:1.29.4-alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder ./app/dist .

CMD ["nginx", "-g", "daemon off;"]

