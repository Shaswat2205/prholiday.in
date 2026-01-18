const express = require('express');
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');
const router = express.Router();

// @desc    Upload file
// @route   POST /api/upload
// @access  Private (Admin)
router.post('/', protect, upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    res.json({
        success: true,
        data: `/uploads/${req.file.filename}`
    });
});

// Multi-file upload if needed
router.post('/multiple', protect, upload.array('files', 10), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ success: false, message: 'No files uploaded' });
    }
    const paths = req.files.map(file => `/uploads/${file.filename}`);
    res.json({
        success: true,
        data: paths
    });
});

module.exports = router;
