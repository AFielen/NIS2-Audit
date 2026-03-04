FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM nginx:alpine AS runner
COPY --from=builder /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Non-root: user-Direktive auskommentieren, PID nach /tmp, Verzeichnisse beschreibbar machen
RUN sed -i 's/^user  nginx;/#user  nginx;/' /etc/nginx/nginx.conf && \
    sed -i 's|pid        /var/run/nginx.pid;|pid /tmp/nginx.pid;|' /etc/nginx/nginx.conf && \
    chown -R nginx:nginx /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx/conf.d /var/run
USER nginx
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
