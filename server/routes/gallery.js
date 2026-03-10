const express = require('express');
const {
    getGallery,
    createGalleryItem,
    deleteGalleryItem
} = require('../controllers/galleryController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getGallery);

// Protected routes (Admin)
router.post('/', protect, authorize('admin'), createGalleryItem);
router.delete('/:id', protect, authorize('admin'), deleteGalleryItem);

module.exports = router;
