const express = require('express');
const {
    getPackages,
    getPackage,
    createPackage,
    updatePackage,
    deletePackage
} = require('../controllers/packageController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getPackages);
router.get('/:id', getPackage);

// Protected routes (Admin)
router.post('/', protect, createPackage);
router.put('/:id', protect, updatePackage);
router.delete('/:id', protect, deletePackage);

module.exports = router;
