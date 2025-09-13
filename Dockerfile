## Multi-stage build for Vue 3 app
# Stage 1: build static assets
FROM node:16-alpine AS build

WORKDIR /app

# Install dependencies based on lockfile for reproducible builds
COPY package*.json ./
RUN npm ci --no-audit --silent

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: serve with Nginx
FROM nginx:1.25-alpine

# Copy custom Nginx config with SPA fallback
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy build artifacts
COPY --from=build /app/dist/ /usr/share/nginx/html/

EXPOSE 80

# Healthcheck (optional but useful in orchestrators)
HEALTHCHECK CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1
