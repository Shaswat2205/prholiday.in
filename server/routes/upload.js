const express = require('express');
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');
const Media = require('../models/Media');
const router = express.Router();

// @desc    Upload file
// @route   POST /api/upload
// @access  Private (Admin)
router.post('/', protect, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }
        
        // Save to MongoDB Buffer
        const media = await Media.create({
            filename: req.file.originalname,
            contentType: req.file.mimetype,
            data: req.file.buffer,
            size: req.file.size
        });

        res.json({
            success: true,
            data: `/api/media/${media._id}`
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error during upload' });
    }
});

// Multi-file upload if needed
router.post('/multiple', protect, upload.array('files', 10), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: 'No files uploaded' });
        }
        
        const mediaDocs = req.files.map(file => ({
            filename: file.originalname,
            contentType: file.mimetype,
            data: file.buffer,
            size: file.size
        }));

        const inserted = await Media.insertMany(mediaDocs);
        const paths = inserted.map(doc => `/api/media/${doc._id}`);

        res.json({
            success: true,
            data: paths
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error during uploads' });
    }
});

module.exports = router;
