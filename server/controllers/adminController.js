const Admin = require('../models/Admin');

// @desc    Login admin
// @route   POST /api/admin/login
// @access  Public
exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Please provide an email and password' });
    }

    // Check for user
    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    sendTokenResponse(admin, 200, res);
};

// @desc    Get current logged in admin
// @route   GET /api/admin/me
// @access  Private
exports.getMe = async (req, res) => {
    const admin = await Admin.findById(req.admin.id);

    res.status(200).json({
        success: true,
        data: admin
    });
};

// Get token from model, create cookie and send response
const sendTokenResponse = (admin, statusCode, res) => {
    const token = admin.getSignedJwtToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res
        .status(statusCode)
        // .cookie('token', token, options) 
        .json({
            success: true,
            token
        });
};
