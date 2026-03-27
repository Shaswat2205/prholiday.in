const Gallery = require('../models/Gallery');

// @desc    Get all gallery items
// @route   GET /api/gallery
// @access  Public
exports.getGallery = async (req, res) => {
    try {
        const gallery = await Gallery.find({ active: true }).sort({ order: 1 });
        res.status(200).json({ success: true, count: gallery.length, data: gallery });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Add gallery item
// @route   POST /api/gallery
// @access  Private (Admin)
exports.createGalleryItem = async (req, res) => {
    try {
        // Handle aliases from frontend if needed
        const data = {
            ...req.body,
            url: req.body.url || req.body.imageUrl,
            caption: req.body.caption || req.body.description,
            type: req.body.type || 'image'
        };

        if (!data.url) {
            return res.status(400).json({ success: false, message: 'Please add an image URL' });
        }

        const item = await Gallery.create(data);
        res.status(201).json({ success: true, data: item });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Delete gallery item
// @route   DELETE /api/admin/gallery/:id
// @access  Private (Admin)
exports.deleteGalleryItem = async (req, res) => {
    try {
        const item = await Gallery.findByIdAndDelete(req.params.id);

        if (!item) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
