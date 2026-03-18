const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    const smtpPort = parseInt(process.env.SMTP_PORT) || 587;
    
    // Determine transport based on env vars
    const transporterOptions = {
        host: process.env.SMTP_HOST || 'smtp.titan.email',
        port: smtpPort,
        secure: smtpPort === 465, // true for 465, false for other ports
        auth: {
            user: (process.env.SMTP_EMAIL || '').trim(),
            pass: (process.env.SMTP_PASSWORD || '').trim()
        },
        tls: {
            rejectUnauthorized: false
        },
        authMethod: 'LOGIN',
        debug: true, // Show debug output
        logger: true // Log information to console
    };
    
    // Create a transporter
    const transporter = nodemailer.createTransport(transporterOptions);

    console.log(`Attempting to send email via ${transporterOptions.host}:${transporterOptions.port}...`);

    // Define email options
    const message = {
        from: `"PRHolidays" <info@prholiday.in>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html
    };

    try {
        // Send email
        const info = await transporter.sendMail(message);
        console.log('Message sent successfully! MessageId: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('SMTP Error details:', {
            message: error.message,
            code: error.code,
            command: error.command,
            response: error.response
        });
        throw error;
    }
};

module.exports = sendEmail;
