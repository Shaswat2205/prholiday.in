const express = require('express');
const {
    getTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
} = require('../controllers/testimonialController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getTestimonials);

// Protected routes (Admin)
router.post('/', protect, createTestimonial);
router.put('/:id', protect, updateTestimonial);
router.delete('/:id', protect, deleteTestimonial);

module.exports = router;
