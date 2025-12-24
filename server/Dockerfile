# ---------- Stage 1: Build ----------
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .


# ---------- Stage 2: Serve ----------



    
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
