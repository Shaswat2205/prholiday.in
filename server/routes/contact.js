const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { protect } = require('../middleware/auth');
const sendEmail = require('../utils/sendEmail');
const { getContactEmailTemplate } = require('../utils/emailTemplates');

// @desc    Submit a contact message
// @route   POST /api/contact
// @access  Public
/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Submit a contact message
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, message]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact message submitted successfully
 */
router.post('/', async (req, res) => {
    try {
        const contact = await Contact.create(req.body);

        // Send email to admin
        try {
            await sendEmail({
                email: 'prholiday.in@gmail.com',
                subject: `New Contact Message: ${contact.subject || 'No Subject'}`,
                html: getContactEmailTemplate(contact)
            });
        } catch (emailErr) {
            console.error('Failed to send contact email:', emailErr);
        }

        res.status(201).json({
            success: true,
            data: contact
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
});

// @desc    Get all contact messages (Admin)
// @route   GET /api/contact
// @access  Private/Admin
router.get('/', protect, async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: contacts.length,
            data: contacts
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
});

module.exports = router;
