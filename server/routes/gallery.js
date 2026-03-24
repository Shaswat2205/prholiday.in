const express = require('express');
const {
    getGallery,
    createGalleryItem,
    deleteGalleryItem
} = require('../controllers/galleryController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
/**
 * @swagger
 * /api/gallery:
 *   get:
 *     summary: Get all gallery items
 *     tags: [Gallery]
 *     responses:
 *       200:
 *         description: List of gallery items retrieved successfully
 */
router.get('/', getGallery);

// Protected routes (Admin)
/**
 * @swagger
 * /api/gallery:
 *   post:
 *     summary: Add a gallery item (Admin)
 *     tags: [Gallery]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [imageUrl]
 *             properties:
 *               imageUrl:
 *                 type: string
 *               caption:
 *                 type: string
 *     responses:
 *       201:
 *         description: Gallery item added
 */
router.post('/', protect, authorize('admin'), createGalleryItem);
router.delete('/:id', protect, authorize('admin'), deleteGalleryItem);

module.exports = router;
