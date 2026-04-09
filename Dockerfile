FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_ Variablen müssen zur Build-Zeit verfügbar sein
ARG NEXT_PUBLIC_APP_URL=https://drk-nis2.de
ARG NEXT_PUBLIC_ABSTIMMUNG_URL=https://drk-abstimmung.de
ARG NEXT_PUBLIC_SELBSTAUSKUNFT_URL=https://drk-selbstauskunft.de
ARG NEXT_PUBLIC_ISMS_URL=https://drk-isms.de
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_ABSTIMMUNG_URL=$NEXT_PUBLIC_ABSTIMMUNG_URL
ENV NEXT_PUBLIC_SELBSTAUSKUNFT_URL=$NEXT_PUBLIC_SELBSTAUSKUNFT_URL
ENV NEXT_PUBLIC_ISMS_URL=$NEXT_PUBLIC_ISMS_URL

RUN npm run build

FROM nginx:alpine AS runner
COPY --from=builder /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:3000/ || exit 1
CMD ["nginx", "-g", "daemon off;"]
