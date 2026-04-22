# Stage 1: Build the React app
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies - using 'ci' is faster and more reliable for Docker
RUN npm ci --legacy-peer-deps --no-audit

# Copy source code
COPY . .

# FIX: Added --stack-size=10000 to prevent the "Maximum call stack" error
# We also keep the memory limit at 4096MB
# ENV NODE_OPTIONS="--max-old-space-size=4096 --stack-size=10000"
ENV GENERATE_SOURCEMAP=false

# Run the build
# Added --no-daemon to ensure the build process stays focused in the container environment
RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

# Install Certbot for SSL and cleanup cache to save space
RUN apk update && apk add --no-cache certbot certbot-nginx curl && \
    rm -rf /var/cache/apk/*

# Clear default Nginx html directory
RUN rm -rf /usr/share/nginx/html/*

# Copy the built React app from the 'build' stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy the Nginx configuration files
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf

# Corrected SSL copy paths
RUN mkdir -p /etc/letsencrypt/live/milestono.com /etc/letsencrypt/archive /var/log/letsencrypt
COPY ./ssl/live/milestono.com /etc/letsencrypt/live/milestono.com

# Add cron job to renew certificates
RUN echo "0 2 * * * certbot renew --quiet --webroot -w /usr/share/nginx/html && nginx -s reload" > /etc/crontabs/root

# Expose both ports (Standard practice for SSL)
EXPOSE 80 443

# Start Nginx with cron job
CMD ["sh", "-c", "crond && nginx -g 'daemon off;'"]
