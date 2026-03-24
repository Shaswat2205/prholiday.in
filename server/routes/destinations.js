const express = require('express');
const {
    getDestinations,
    getDestination,
    createDestination,
    updateDestination,
    deleteDestination
} = require('../controllers/destinationController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
/**
 * @swagger
 * /api/destinations:
 *   get:
 *     summary: Get all destinations
 *     tags: [Destinations]
 *     responses:
 *       200:
 *         description: List of destinations retrieved successfully
 */
router.get('/', getDestinations);

/**
 * @swagger
 * /api/destinations/{id}:
 *   get:
 *     summary: Get a single destination by ID
 *     tags: [Destinations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Destination ID
 *     responses:
 *       200:
 *         description: Destination retrieved successfully
 *       404:
 *         description: Destination not found
 */
router.get('/:id', getDestination);

// Protected routes (Admin)
router.post('/', protect, authorize('admin'), createDestination);
router.put('/:id', protect, authorize('admin'), updateDestination);
router.delete('/:id', protect, authorize('admin'), deleteDestination);

module.exports = router;
