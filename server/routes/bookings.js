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
/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create a booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [packageId, date, members]
 *             properties:
 *               packageId:
 *                 type: string
 *               date:
 *                 type: string
 *               members:
 *                 type: number
 *     responses:
 *       201:
 *         description: Booking created successfully
 */
router.post('/', createBooking);

// Protected routes (User)
/**
 * @swagger
 * /api/bookings/my:
 *   get:
 *     summary: Get logged in user's bookings
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's bookings retrieved successfully
 */
router.get('/my', protect, getMyBookings);

// Protected routes (Admin)
router.get('/', protect, authorize('admin'), getBookings);
router.put('/:id', protect, authorize('admin'), updateBookingStatus);

module.exports = router;
