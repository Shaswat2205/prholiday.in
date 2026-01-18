const express = require('express');
const {
    getDestinations,
    getDestination,
    createDestination,
    updateDestination,
    deleteDestination
} = require('../controllers/destinationController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getDestinations);
router.get('/:id', getDestination);

// Protected routes (Admin)
router.post('/', protect, createDestination);
router.put('/:id', protect, updateDestination);
router.delete('/:id', protect, deleteDestination);

module.exports = router;
