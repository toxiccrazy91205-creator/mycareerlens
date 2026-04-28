# Stage 1: Build React Frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Stage 2: Build Node Backend
FROM node:18-alpine
WORKDIR /app

# Copy server package files and install
COPY server/package*.json ./server/
RUN cd server && npm install --production

# Copy server source
COPY server/ ./server/

# Copy built frontend from Stage 1 to the location expected by the server
COPY --from=frontend-builder /app/client/build ./client/build

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Expose port
EXPOSE 5000

# Start the server
CMD ["node", "server/src/index.js"]
