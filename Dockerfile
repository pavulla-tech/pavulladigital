# Stage 1 — build
FROM node:24-slim AS build
WORKDIR /app

# Copy package.json only
COPY package.json ./

# Install dependencies (this will create a fresh package-lock.json)
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Stage 2 — serve with nginx
FROM nginx:alpine AS prod
# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy built files
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]