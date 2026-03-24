# Stage 1: Build the React Client
FROM node:20-alpine AS client-builder
WORKDIR /app/client
# Install dependencies
COPY client/package*.json ./
RUN npm install
# Copy source code and build
COPY client/ ./
# We set build arguments for Vite
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# Stage 2: Setup the Node Server
FROM node:20-alpine
WORKDIR /app/server
# Copy server dependencies
COPY server/package*.json ./
RUN npm install --production

# Copy server source code
COPY server/ ./

# Copy the built React app from the first stage
# The server.js expects it to be in ../client/dist relative to the server folder
WORKDIR /app
COPY --from=client-builder /app/client/dist ./client/dist

# Expose the API port
EXPOSE 5000

# Start the server
WORKDIR /app/server
CMD ["npm", "start"]
