# ===== Etapa 1: Build do Angular =====
FROM node:20-alpine AS build

WORKDIR /app

# Copia apenas os arquivos de dependência primeiro (melhora cache do Docker)
COPY package*.json ./
RUN npm ci

# Copia o resto do código e builda
COPY . .
RUN npm run build -- --configuration production

# ===== Etapa 2: Servir com Nginx =====
FROM nginx:alpine

# Remove a config padrão do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia o build do Angular para a pasta do nginx
# Ajuste "frontend" abaixo para o nome real do seu projeto dentro de angular.json -> outputPath
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

# Copia configuração customizada do nginx (necessária para rotas do Angular funcionarem)
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
