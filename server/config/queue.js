const { Queue, Worker } = require('bullmq');
const IORedis = require('ioredis');

const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const connection = new IORedis(redisUrl, { maxRetriesPerRequest: null });

connection.on('error', (err) => {
    console.error('Redis connection error for BullMQ:', err.message);
});

// Create the email/notification queue
const notificationQueue = new Queue('notifications', { connection });

module.exports = { notificationQueue, connection };
