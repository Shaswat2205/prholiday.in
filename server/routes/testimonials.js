const express = require('express');
const {
    getTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
} = require('../controllers/testimonialController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getTestimonials);

// Protected routes (Admin)
router.post('/', protect, authorize('admin'), createTestimonial);
router.put('/:id', protect, authorize('admin'), updateTestimonial);
router.delete('/:id', protect, authorize('admin'), deleteTestimonial);

module.exports = router;
