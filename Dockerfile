# Stage 1 — build
FROM node:24-alpine AS build
WORKDIR /app

# Copy package files
COPY package*.json ./

# Clean install with proper optional dependencies
RUN npm install --legacy-peer-deps

# Copy source and build
COPY . .
RUN npm run build

# Stage 2 — serve with nginx
FROM nginx:alpine AS prod
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]