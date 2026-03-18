const Booking = require('../models/Booking');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendEvent } = require('../events/producer');
const sendEmail = require('../utils/sendEmail');
const { getAdminBookingTemplate, getUserBookingTemplate } = require('../utils/emailTemplates');

// @desc    Create new booking inquiry
// @route   POST /api/bookings
// @access  Public (Optional Auth)
exports.createBooking = async (req, res) => {
    try {
        const bookingData = { ...req.body };

        // Manual check for user if not already set by middleware (since this is a public route)
        if (!req.user && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                const token = req.headers.authorization.split(' ')[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const user = await User.findById(decoded.id);
                if (user) {
                    bookingData.user = user.id;
                }
            } catch (err) {
                // Ignore token error for public route
            }
        } else if (req.user) {
            bookingData.user = req.user.id;
        }

        const booking = await Booking.create(bookingData);
        
        // Dispatch event softly (don't fail request if Kafka is down)
        // This now triggers the background email jobs via server/events/consumer.js
        const eventSent = await sendEvent('booking.created', booking);

        // FALLBACK: If Kafka is down, send emails directly so the user/admin still get notified
        if (!eventSent) {
            console.log('[Fallback] Kafka down, sending emails directly...');
            
            // 1. Send to Admin
            if (process.env.ADMIN_EMAIL) {
                sendEmail({
                    email: process.env.ADMIN_EMAIL,
                    subject: 'New Booking Inquiry (Fallback) - PRHolidays',
                    html: getAdminBookingTemplate(booking)
                }).catch(e => console.error('[Fallback] Admin Email Err:', e.message));
            }

            // 2. Send to User
            if (booking.email) {
                sendEmail({
                    email: booking.email,
                    subject: 'We Received Your Booking Inquiry! - PRHolidays',
                    html: getUserBookingTemplate(booking)
                }).catch(e => console.error('[Fallback] User Email Err:', e.message));
            }
        }

        res.status(201).json({ success: true, data: booking });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Get current user's bookings
// @route   GET /api/bookings/my
// @access  Private
exports.getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: bookings.length, data: bookings });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get all bookings
// @route   GET /api/admin/bookings
// @access  Private (Admin)
exports.getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: bookings.length, data: bookings });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Update booking status
// @route   PUT /api/admin/bookings/:id
// @access  Private (Admin)
exports.updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        console.log(`[Update] Booking ${req.params.id} status update requested: ${status}`);

        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        // Trigger background notification or fallback
        console.log(`[Update] Dispatching Kafka event for status: ${booking.status}`);
        const eventSent = await sendEvent('booking.updated', booking);
        console.log(`[Update] Kafka event sent: ${eventSent}`);

        if (!eventSent && booking.email) {
            console.log('[Update][Fallback] Kafka down, sending status update email directly...');
            sendEmail({
                email: booking.email,
                subject: `Booking Status Update: ${booking.status.toUpperCase()} - PRHolidays`,
                html: getStatusChangeTemplate(booking)
            }).then(() => console.log('[Update][Fallback] Email success'))
              .catch(e => console.error('[Update][Fallback] Status Email Err:', e.message));
        }

        res.status(200).json({ success: true, data: booking });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
