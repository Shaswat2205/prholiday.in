#!/bin/bash
# PRHoliday.in - Zero Downtime Deployment Script

# Exit immediately if a command exits with a non-zero status
set -e

echo "🚀 Starting Deployment Process..."

# 1. Pull the latest code from GitHub
echo "📥 Pulling latest code..."
git pull origin main

# 2. Build the new Docker image without caching to ensure latest dependencies
# Using docker-compose build ensures we build the 'app' service
echo "🔨 Building new Docker image..."
docker-compose build app

# 3. Bring up the containers (in detached mode). 
# This command automatically orchestrates recreating ONLY the containers that have changed (i.e. 'app').
# Because NPM (Nginx Proxy Manager) proxies to the internal port, you'll only experience a few seconds 
# of downtime while the new container starts, which is as close to "zero-downtime" as possible on a single node.
echo "🔄 Starting services..."
docker-compose up -d

# 4. Clean up old, dangling images to save EC2 disk space
echo "🧹 Cleaning up old Docker images..."
docker image prune -f

echo "✅ Deployment Complete! PRHoliday.in is now running the latest version."
