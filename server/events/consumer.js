const { Worker } = require('bullmq');
const { connection } = require('../config/queue');
const sendEmail = require('../utils/sendEmail');
const sendWhatsApp = require('../utils/whatsapp');
const { getAdminBookingTemplate, getUserBookingTemplate, getStatusChangeTemplate } = require('../utils/emailTemplates');

const connectConsumer = () => {
    console.log('Starting BullMQ Consumer Worker...');

    const worker = new Worker('notifications', async (job) => {
        const topic = job.name;
        const data = job.data;
        
        console.log(`[BullMQ Worker] Processing job: ${topic} - Job ID: ${job.id}`);

        try {
            switch(topic) {
                case 'booking.created':
                    console.log(`[BullMQ] Sending booking notifications for ${data.name}`);
                    
                    // 1. Send to Admin
                    if (process.env.ADMIN_EMAIL) {
                        await sendEmail({
                            email: process.env.ADMIN_EMAIL,
                            subject: 'New Booking Inquiry - PRHolidays',
                            html: getAdminBookingTemplate(data)
                        }).catch(err => console.error('[BullMQ] Admin Email Failed', err.message));
                    }

                    // 2. Send to User
                    if (data.email) {
                        await sendEmail({
                            email: data.email,
                            subject: 'We Received Your Booking Inquiry! - PRHolidays',
                            html: getUserBookingTemplate(data)
                        }).catch(err => console.error('[BullMQ] User Email Failed', err.message));
                    }

                    // 3. Send WhatsApp Alert to Admin
                    if (process.env.ADMIN_WHATSAPP_NUMBER) {
                        const waMessage = `🌴 *New Inquiry - PRHoliday.in* 🌴\n\n👤 *Guest:* ${data.name}\n📧 *Email:* ${data.email}\n📱 *Phone:* ${data.phone}\n📦 *Package:* ${data.packageName || 'Custom'}\n📅 *Date:* ${data.travelDate ? new Date(data.travelDate).toLocaleDateString() : 'TBD'}\n\nCheck the admin dashboard for details!`;
                        
                        await sendWhatsApp({
                            to: process.env.ADMIN_WHATSAPP_NUMBER,
                            message: waMessage
                        }).catch(err => console.error('[BullMQ] WhatsApp Admin Alert Failed', err.message));
                    }
                    break;

                case 'booking.updated':
                    console.log(`[BullMQ] Processing status change email: ${data.status} for ${data.email}`);
                    if (data.email) {
                        await sendEmail({
                            email: data.email,
                            subject: `Booking Status Update: ${data.status.toUpperCase()} - PRHolidays`,
                            html: getStatusChangeTemplate(data)
                        }).catch(err => console.error(`[BullMQ] Status Email Failed (${data.status})`, err.message));
                    }
                    break;

                case 'user.registered':
                    console.log(`[BullMQ] Processing registration email to user ${data.email}`);
                    // logic for registration welcome email can be added here
                    break;
                    
                default:
                    console.log(`[BullMQ] Unhandled job name: ${topic}`);
            }
        } catch (err) {
            console.error('[BullMQ] Error processing job:', err.message);
            // Throw error to trigger retry mechanism
            throw err;
        }
    }, { connection });

    worker.on('completed', job => {
        console.log(`[BullMQ] Job ${job.id} has completed!`);
    });

    worker.on('failed', (job, err) => {
        console.log(`[BullMQ] Job ${job.id} has failed with ${err.message}`);
    });
};

module.exports = { connectConsumer };
