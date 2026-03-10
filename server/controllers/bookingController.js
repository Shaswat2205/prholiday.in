const Booking = require('../models/Booking');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendEvent } = require('../events/producer');
const sendEmail = require('../utils/sendEmail');

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
        sendEvent('booking.created', booking).catch(e => console.error('Kafka send err:', e.message));

        // Notify Admin of new booking
        if (process.env.ADMIN_EMAIL) {
            try {
                await sendEmail({
                    email: process.env.ADMIN_EMAIL,
                    subject: 'New Booking Inquiry - PRHolidays',
                    message: `A new booking inquiry has been received from ${booking.name}.\nPackage: ${booking.packageName}\nTravelers: ${booking.travelers}\nTravel Date: ${booking.travelDate ? new Date(booking.travelDate).toLocaleDateString() : 'TBD'}`,
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                            <h2 style="color: #0b9185;">New Booking Inquiry!</h2>
                            <p><strong>Name:</strong> ${booking.name}</p>
                            <p><strong>Email:</strong> ${booking.email}</p>
                            <p><strong>Phone:</strong> ${booking.phone}</p>
                            <p><strong>Package:</strong> ${booking.packageName}</p>
                            <p><strong>Travel Date:</strong> ${booking.travelDate ? new Date(booking.travelDate).toLocaleDateString() : 'TBD'}</p>
                            <p><strong>Travelers:</strong> ${booking.travelers}</p>
                            <p style="margin-top: 20px;"><em>You can manage this booking directly from your Admin Dashboard.</em></p>
                        </div>
                    `
                });
            } catch (err) {
                console.error("Admin Email Failed", err);
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

        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        if (status === 'confirmed' && booking.email) {
            try {
                await sendEmail({
                    email: booking.email,
                    subject: 'Adventure Confirmed! - PRHolidays',
                    message: `Dear ${booking.name},\n\nYour adventure for ${booking.packageName || 'a package'} has been confirmed!\n\nTravel Date: ${booking.travelDate ? new Date(booking.travelDate).toLocaleDateString() : 'TBD'}\nTravelers: ${booking.travelers}\n\nOur team is excited to host you. Please reply to this email if you have any questions.\n\nBest regards,\nThe PRHolidays Team`,
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <h2 style="color: #0b9185;">Adventure Confirmed!</h2>
                            <p>Dear ${booking.name},</p>
                            <p>Great news! Your booking for <strong>${booking.packageName || 'a package'}</strong> has been confirmed.</p>
                            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
                                <p style="margin: 5px 0;"><strong>Travel Date:</strong> ${booking.travelDate ? new Date(booking.travelDate).toLocaleDateString() : 'TBD'}</p>
                                <p style="margin: 5px 0;"><strong>Travelers:</strong> ${booking.travelers}</p>
                            </div>
                            <p>Our team is excited to carefully craft your experience. We will follow up shortly with further itinerary instructions.</p>
                            <p>Best regards,<br><strong>The PRHolidays Team</strong></p>
                        </div>
                    `
                });
            } catch (emailErr) {
                console.error('Email sending failed:', emailErr);
            }
        }

        res.status(200).json({ success: true, data: booking });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
