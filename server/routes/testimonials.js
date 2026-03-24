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
/**
 * @swagger
 * /api/testimonials:
 *   get:
 *     summary: Get approved testimonials
 *     tags: [Testimonials]
 *     responses:
 *       200:
 *         description: List of approved testimonials retrieved successfully
 */
router.get('/', getTestimonials);

// User routes
/**
 * @swagger
 * /api/testimonials:
 *   post:
 *     summary: Create a testimonial
 *     tags: [Testimonials]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [content]
 *             properties:
 *               content:
 *                 type: string
 *               packageId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Testimonial created successfully
 */
router.post('/', protect, createTestimonial);

// Protected routes (Admin)
router.get('/admin', protect, authorize('admin'), getAllTestimonials);
router.put('/:id', protect, authorize('admin'), updateTestimonial);
router.delete('/:id', protect, authorize('admin'), deleteTestimonial);

module.exports = router;
