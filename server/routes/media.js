const express = require('express');
const Media = require('../models/Media');
const router = express.Router();

// @desc    Get media by ID
// @route   GET /api/media/:id
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const media = await Media.findById(req.params.id);
        
        if (!media) {
            return res.status(404).json({ success: false, message: 'Media not found' });
        }

        // Set proper content type from db and send the binary buffer
        res.set('Content-Type', media.contentType);
        res.set('Cache-Control', 'public, max-age=31557600'); // Cache for 1 year
        res.send(media.data);
    } catch (err) {
        console.error('Media fetching error:', err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

module.exports = router;
