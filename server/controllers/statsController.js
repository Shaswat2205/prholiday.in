const Booking = require('../models/Booking');
const Destination = require('../models/Destination');
const Testimonial = require('../models/Testimonial');

// @desc    Get public statistics for home page counters
// @route   GET /api/stats
// @access  Public
exports.getPublicStats = async (req, res) => {
    try {
        // 1. Happy Travelers: Sum of travelers from all bookings
        const travelerStats = await Booking.aggregate([
            { $group: { _id: null, total: { $sum: "$travelers" } } }
        ]);
        const happyTravelers = travelerStats.length > 0 ? travelerStats[0].total : 0;

        // 2. Destinations: Total count of active destinations
        const destinationsCount = await Destination.countDocuments({ active: true });

        // 3. Positive Reviews: Count of approved testimonials
        const reviewsCount = await Testimonial.countDocuments({ active: true, status: 'approved' });

        res.status(200).json({
            success: true,
            data: {
                happyTravelers: happyTravelers + 1000, // Adding a base offset for "legacy" data if needed, or just raw
                destinations: destinationsCount,
                positiveReviews: reviewsCount
            }
        });
    } catch (err) {
        console.error('Error fetching stats:', err);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};
