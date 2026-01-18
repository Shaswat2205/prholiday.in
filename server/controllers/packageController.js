const Package = require('../models/Package');

// @desc    Get all packages
// @route   GET /api/packages
// @access  Public
exports.getPackages = async (req, res) => {
    try {
        const packages = await Package.find({ active: true });
        res.status(200).json({ success: true, count: packages.length, data: packages });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get single package
// @route   GET /api/packages/:id
// @access  Public
exports.getPackage = async (req, res) => {
    try {
        const pkg = await Package.findById(req.params.id);

        if (!pkg) {
            return res.status(404).json({ success: false, message: 'Package not found' });
        }

        res.status(200).json({ success: true, data: pkg });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Create new package
// @route   POST /api/admin/packages
// @access  Private (Admin)
exports.createPackage = async (req, res) => {
    try {
        const pkg = await Package.create(req.body);
        res.status(201).json({ success: true, data: pkg });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Update package
// @route   PUT /api/admin/packages/:id
// @access  Private (Admin)
exports.updatePackage = async (req, res) => {
    try {
        const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!pkg) {
            return res.status(404).json({ success: false, message: 'Package not found' });
        }

        res.status(200).json({ success: true, data: pkg });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Delete package
// @route   DELETE /api/admin/packages/:id
// @access  Private (Admin)
exports.deletePackage = async (req, res) => {
    try {
        const pkg = await Package.findByIdAndDelete(req.params.id);

        if (!pkg) {
            return res.status(404).json({ success: false, message: 'Package not found' });
        }

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
