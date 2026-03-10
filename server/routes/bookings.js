const express = require('express');
const {
    createBooking,
    getBookings,
    getMyBookings,
    updateBookingStatus
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes (with optional auth handled in controller)
router.post('/', createBooking);

// Protected routes (User)
router.get('/my', protect, getMyBookings);

// Protected routes (Admin)
router.get('/', protect, authorize('admin'), getBookings);
router.put('/:id', protect, authorize('admin'), updateBookingStatus);

module.exports = router;
