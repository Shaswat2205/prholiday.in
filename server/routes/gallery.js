const express = require('express');
const {
    getGallery,
    createGalleryItem,
    deleteGalleryItem
} = require('../controllers/galleryController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getGallery);

// Protected routes (Admin)
router.post('/', protect, createGalleryItem);
router.delete('/:id', protect, deleteGalleryItem);

module.exports = router;
