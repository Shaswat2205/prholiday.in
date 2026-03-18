const kafka = require('../config/kafka');
const sendEmail = require('../utils/sendEmail');
const sendWhatsApp = require('../utils/whatsapp');
const { getAdminBookingTemplate, getUserBookingTemplate, getStatusChangeTemplate } = require('../utils/emailTemplates');

const consumer = kafka.consumer({ groupId: 'monolith-group' });

const connectConsumer = async () => {
    try {
        await consumer.connect();
        console.log('Kafka Consumer connected');

        // Subscribe to topics
        await consumer.subscribe({ topic: 'booking.created', fromBeginning: false });
        await consumer.subscribe({ topic: 'booking.updated', fromBeginning: false });
        await consumer.subscribe({ topic: 'user.registered', fromBeginning: false });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log(`[Kafka Consumer] Received event on topic: ${topic}`);
                try {
                    const data = JSON.parse(message.value.toString());
                    
                    // Handle different topics asynchronously
                    switch(topic) {
                        case 'booking.created':
                            console.log(`[Kafka] Processing background job: Sending booking notifications for ${data.name}`);
                            
                            // 1. Send to Admin
                            if (process.env.ADMIN_EMAIL) {
                                await sendEmail({
                                    email: process.env.ADMIN_EMAIL,
                                    subject: 'New Booking Inquiry - PRHolidays',
                                    html: getAdminBookingTemplate(data)
                                }).catch(err => console.error('[Kafka] Background Admin Email Failed', err.message));
                            }

                            // 2. Send to User
                            if (data.email) {
                                await sendEmail({
                                    email: data.email,
                                    subject: 'We Received Your Booking Inquiry! - PRHolidays',
                                    html: getUserBookingTemplate(data)
                                }).catch(err => console.error('[Kafka] Background User Email Failed', err.message));
                            }

                            // 3. Send WhatsApp Alert to Admin
                            if (process.env.ADMIN_WHATSAPP_NUMBER) {
                                const waMessage = `🌴 *New Inquiry - PRHoliday.in* 🌴\n\n👤 *Guest:* ${data.name}\n📧 *Email:* ${data.email}\n📱 *Phone:* ${data.phone}\n📦 *Package:* ${data.packageName || 'Custom'}\n📅 *Date:* ${data.travelDate ? new Date(data.travelDate).toLocaleDateString() : 'TBD'}\n\nCheck the admin dashboard for details!`;
                                
                                await sendWhatsApp({
                                    to: process.env.ADMIN_WHATSAPP_NUMBER,
                                    message: waMessage
                                }).catch(err => console.error('[Kafka] WhatsApp Admin Alert Failed', err.message));
                            }
                            break;

                        case 'booking.updated':
                            console.log(`[Kafka] Processing status change email: ${data.status} for ${data.email}`);
                            if (data.email) {
                                await sendEmail({
                                    email: data.email,
                                    subject: `Booking Status Update: ${data.status.toUpperCase()} - PRHolidays`,
                                    html: getStatusChangeTemplate(data)
                                }).catch(err => console.error(`[Kafka] Background Status Email Failed (${data.status})`, err.message));
                            }
                            break;

                        case 'user.registered':
                            console.log(`[Kafka] Processing background job: Sending welcome email to user ${data.email}`);
                            // logic for registration welcome email can be added here
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
