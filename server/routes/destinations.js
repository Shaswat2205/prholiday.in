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
router.get('/', getDestinations);
router.get('/:id', getDestination);

// Protected routes (Admin)
router.post('/', protect, authorize('admin'), createDestination);
router.put('/:id', protect, authorize('admin'), updateDestination);
router.delete('/:id', protect, authorize('admin'), deleteDestination);

module.exports = router;
