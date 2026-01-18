const Destination = require('../models/Destination');

// @desc    Get all destinations
// @route   GET /api/destinations
// @access  Public
exports.getDestinations = async (req, res) => {
    try {
        const destinations = await Destination.find({ active: true });
        res.status(200).json({ success: true, count: destinations.length, data: destinations });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get single destination
// @route   GET /api/destinations/:id
// @access  Public
exports.getDestination = async (req, res) => {
    try {
        const destination = await Destination.findById(req.params.id);

        if (!destination) {
            return res.status(404).json({ success: false, message: 'Destination not found' });
        }

        res.status(200).json({ success: true, data: destination });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Create new destination
// @route   POST /api/admin/destinations
// @access  Private (Admin)
exports.createDestination = async (req, res) => {
    try {
        const destination = await Destination.create(req.body);
        res.status(201).json({ success: true, data: destination });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Update destination
// @route   PUT /api/admin/destinations/:id
// @access  Private (Admin)
exports.updateDestination = async (req, res) => {
    try {
        const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!destination) {
            return res.status(404).json({ success: false, message: 'Destination not found' });
        }

        res.status(200).json({ success: true, data: destination });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Delete destination
// @route   DELETE /api/admin/destinations/:id
// @access  Private (Admin)
exports.deleteDestination = async (req, res) => {
    try {
        const destination = await Destination.findByIdAndDelete(req.params.id);

        if (!destination) {
            return res.status(404).json({ success: false, message: 'Destination not found' });
        }

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
