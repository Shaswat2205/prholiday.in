const nodemailer = require('nodemailer');
require('dotenv').config();

const testSmtp = async () => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtpout.secureserver.net',
        port: 465,
        secure: true,
        auth: {
            user: (process.env.SMTP_EMAIL || '').trim(),
            pass: (process.env.SMTP_PASSWORD || '').trim()
        },
        tls: {
            rejectUnauthorized: false
        },
        authMethod: 'LOGIN',
        debug: true,
        logger: true
    });

    console.log('Testing connection to:', process.env.SMTP_HOST);
    console.log('User:', process.env.SMTP_EMAIL);

    try {
        await transporter.verify();
        console.log('Connection success!');
        
        await transporter.sendMail({
            from: `"PRHolidays Test" <${process.env.SMTP_EMAIL}>`,
            to: process.env.ADMIN_EMAIL,
            subject: 'SMTP Diagnostic Test - GoDaddy Legacy',
            text: 'This is a diagnostic test to verify SMTP settings for GoDaddy.'
        });
        console.log('Test email sent successfully!');
    } catch (error) {
        console.error('SMTP Diagnostic Failed:');
        console.error(error);
    }
};

testSmtp();
