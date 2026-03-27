const Package = require('../models/Package');
const Destination = require('../models/Destination');
const nodemailer = require('nodemailer');

// @desc    Global search for packages and destinations
// @route   GET /api/search
// @access  Public
exports.globalSearch = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({ success: false, message: 'Please provide a search query' });
        }

        const searchRegex = new RegExp(q, 'i');

        // Search in Packages
        const packages = await Package.find({
            $or: [
                { name: searchRegex },
                { description: searchRegex },
                { category: searchRegex }
            ],
            active: true
        }).populate('destination', 'name country');

        // Search in Destinations
        const destinations = await Destination.find({
            $or: [
                { name: searchRegex },
                { country: searchRegex },
                { description: searchRegex }
            ]
        });

        res.status(200).json({
            success: true,
            data: {
                packages,
                destinations
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error during global search' });
    }
};

// @desc    Send request email when search results are empty
// @route   POST /api/search/request
// @access  Public
exports.sendSearchRequestEmail = async (req, res) => {
    try {
        const { query, dates, travelers, userEmail } = req.body;

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        const mailOptions = {
            from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
            to: 'info@prholiday.in',
            subject: 'New Destination/Package Request',
            html: `
                <h3>New Request from Search Fallback</h3>
                <p><strong>Search Query:</strong> ${query}</p>
                <p><strong>Preferred Dates:</strong> ${dates}</p>
                <p><strong>Number of Travelers:</strong> ${travelers}</p>
                ${userEmail ? `<p><strong>User Email:</strong> ${userEmail}</p>` : ''}
                <p>This request was automatically generated because the user searched for a destination or package that is currently not available in the database.</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: 'Request email sent successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error sending search request email' });
    }
};
