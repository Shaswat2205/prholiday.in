const { notificationQueue } = require('../config/queue');

const connectProducer = async () => {
    // BullMQ Producer connects automatically via IORedis
    console.log('BullMQ (Redis) Producer ready');
};

const sendEvent = async (topic, message) => {
    try {
        // We use the "topic" as the job name in the notifications queue
        await notificationQueue.add(topic, message, {
            attempts: 3,
            backoff: {
                type: 'exponential',
                delay: 1000,
            },
        });
        return true;
    } catch (error) {
        console.error(`Error adding BullMQ job for ${topic}:`, error.message);
        return false;
    }
};

module.exports = { connectProducer, sendEvent };
