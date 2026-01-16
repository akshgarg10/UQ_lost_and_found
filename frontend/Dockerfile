# ---- build stage ----
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# CRA reads REACT_APP_* at build time
ARG REACT_APP_API_BASE
ENV REACT_APP_API_BASE=$REACT_APP_API_BASE

RUN npm run build

# ---- runtime stage ----
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# CRA outputs to build/
COPY --from=build /app/build ./

# SPA fallback
COPY <<'NGINX' /etc/nginx/conf.d/default.conf
server {
  listen 80;
  server_name _;
  root /usr/share/nginx/html;
  index index.html;
  location / { try_files $uri /index.html; }
}
NGINX

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
