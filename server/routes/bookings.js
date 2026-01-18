const express = require('express');
const {
    createBooking,
    getBookings,
    updateBookingStatus
} = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/', createBooking);

// Protected routes (Admin)
router.get('/', protect, getBookings);
router.put('/:id', protect, updateBookingStatus);

module.exports = router;
