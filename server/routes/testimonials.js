const express = require('express');
const {
    getTestimonials,
    getAllTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
} = require('../controllers/testimonialController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getTestimonials);

// User routes
router.post('/', protect, createTestimonial);

// Protected routes (Admin)
router.get('/admin', protect, authorize('admin'), getAllTestimonials);
router.put('/:id', protect, authorize('admin'), updateTestimonial);
router.delete('/:id', protect, authorize('admin'), deleteTestimonial);

module.exports = router;
