FROM node:22-alpine AS server-build
WORKDIR /app
COPY server/backend/package*.json ./
COPY server/backend/tsconfig*.json ./
COPY server/backend/src ./src
COPY server/backend/server/package*.json ./server/
COPY server/backend/server/tsconfig*.json ./server/
COPY server/backend/server/src ./server/src
WORKDIR /app/server
RUN npm install --no-audit --no-fund
RUN npm run build

FROM node:22-alpine AS runtime
WORKDIR /app/server
ENV NODE_ENV=production PORT=3001
COPY server/backend/server/package*.json ./
RUN npm install --omit=dev --no-audit --no-fund
COPY --from=server-build /app/server/dist ./dist
EXPOSE 3001
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD wget -qO- http://127.0.0.1:3001/health || exit 1
CMD ["node","dist/server/src/index.js"]
