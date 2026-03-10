const Booking = require('../models/Booking');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

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

        res.status(200).json({ success: true, data: booking });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
