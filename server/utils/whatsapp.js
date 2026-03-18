const twilio = require('twilio');

const sendWhatsApp = async ({ to, message }) => {
    try {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER; // e.g., 'whatsapp:+14155238886' (Twilio sandbox)

        if (!accountSid || !authToken || !fromNumber) {
            console.log('[WhatsApp] Credentials not configured. Skipping notification.');
            return;
        }

        const client = twilio(accountSid, authToken);

        const response = await client.messages.create({
            body: message,
            from: fromNumber,
            to: `whatsapp:${to}`
        });

        console.log(`[WhatsApp] Message sent: ${response.sid}`);
        return response;
    } catch (error) {
        console.error('[WhatsApp] Error sending message:', error.message);
        throw error;
    }
};

module.exports = sendWhatsApp;
