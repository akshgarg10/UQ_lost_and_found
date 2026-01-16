FROM node:20-alpine as deps
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

# ---- runtime image ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=deps /app/node_modules /app/node_modules
COPY . .
EXPOSE 3000

CMD ["node", "src/server.js"]