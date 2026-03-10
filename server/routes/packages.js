const express = require('express');
const {
    getPackages,
    getPackage,
    createPackage,
    updatePackage,
    deletePackage
} = require('../controllers/packageController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getPackages);
router.get('/:id', getPackage);

// Protected routes (Admin)
router.post('/', protect, authorize('admin'), createPackage);
router.put('/:id', protect, authorize('admin'), updatePackage);
router.delete('/:id', protect, authorize('admin'), deletePackage);

module.exports = router;
