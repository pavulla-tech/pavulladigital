# Stage 1 — build
FROM node:24-alpine AS build
WORKDIR /app

# copy package files first for better layer caching
COPY package*.json ./
RUN npm ci --production=false

# copy rest and build
COPY . .
RUN npm run build

# Stage 2 — serve with nginx
FROM nginx:alpine
# remove default html (optional)
RUN rm -rf /usr/share/nginx/html/*
# copy built static site
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
