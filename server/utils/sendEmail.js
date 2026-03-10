const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // Determine transport based on env vars
    const transporterOptions = {
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: process.env.SMTP_PORT || 587,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD
        }
    };
    
    // Create a transporter
    const transporter = nodemailer.createTransport(transporterOptions);

    // Define email options
    const message = {
        from: `${process.env.FROM_NAME || 'PRHolidays'} <${process.env.FROM_EMAIL || process.env.SMTP_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html
    };

    // Send email
    const info = await transporter.sendMail(message);

    console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;
