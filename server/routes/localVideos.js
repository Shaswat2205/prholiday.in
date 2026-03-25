const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// @desc    Get all local videos from public folder
// @route   GET /api/local-videos
// @access  Public
router.get('/', (req, res) => {
    try {
        const videosPath = path.join(__dirname, '../../client/public/videos');
        
        if (!fs.existsSync(videosPath)) {
            return res.json({ success: true, data: [] });
        }

        const files = fs.readdirSync(videosPath);
        const videoExtensions = ['.mp4', '.webm', '.ogg'];
        
        const videoFiles = files
            .filter(file => videoExtensions.includes(path.extname(file).toLowerCase()))
            .map(file => ({
                _id: `local-${file}`,
                url: `/videos/${file}`,
                type: 'video',
                caption: file.split('.')[0],
                isLocal: true
            }));

        res.status(200).json({
            success: true,
            count: videoFiles.length,
            data: videoFiles
        });
    } catch (err) {
        console.error('Error scanning local videos:', err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

module.exports = router;
