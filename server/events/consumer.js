const kafka = require('../config/kafka');

const consumer = kafka.consumer({ groupId: 'monolith-group' });

const connectConsumer = async () => {
    try {
        await consumer.connect();
        console.log('Kafka Consumer connected');

        // Subscribe to topics
        await consumer.subscribe({ topic: 'booking.created', fromBeginning: true });
        await consumer.subscribe({ topic: 'user.registered', fromBeginning: true });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log(`[Kafka Consumer] Received message on topic: ${topic}`);
                try {
                    const data = JSON.parse(message.value.toString());
                    
                    // Handle different topics asynchronously
                    switch(topic) {
                        case 'booking.created':
                            console.log(`--> Triggered async background job: Sending confirmation email for booking ${data._id} to ${data.email}`);
                            // Logic to send email/SMS would go here without blocking the API response
                            break;
                        case 'user.registered':
                            console.log(`--> Triggered async background job: Sending welcome email to user ${data.email}`);
                            break;
                        default:
                            console.log(`Unhandled topic: ${topic}`);
                    }
                } catch (err) {
                    console.error('Error processing Kafka message:', err.message);
                }
            },
        });
    } catch (error) {
        console.error('Kafka Consumer Connection Error:', error.message);
    }
};

module.exports = { connectConsumer };
