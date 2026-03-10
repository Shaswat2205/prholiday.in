const kafka = require('../config/kafka');

const producer = kafka.producer();

const connectProducer = async () => {
    try {
        await producer.connect();
        console.log('Kafka Producer connected');
    } catch (error) {
        console.error('Kafka Producer Connection Error:', error.message);
    }
};

const sendEvent = async (topic, message) => {
    try {
        await producer.send({
            topic,
            messages: [{ value: JSON.stringify(message) }],
        });
    } catch (error) {
        console.error(`Error sending Kafka event to ${topic}:`, error.message);
    }
};

module.exports = { connectProducer, sendEvent };
