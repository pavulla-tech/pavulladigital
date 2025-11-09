# Stage 1 — build (use Debian-based Node so rollup's native deps load correctly)
FROM node:24-bullseye-slim AS build
WORKDIR /app

# copy package files first for caching
COPY package*.json ./

# install (use npm ci for reproducible installs)
RUN npm ci

# copy source and build
COPY . .
RUN npm run build

# Stage 2 — serve with nginx
FROM nginx:alpine AS prod
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
