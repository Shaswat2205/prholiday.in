const User = require('../models/User');
const Admin = require('../models/Admin');
const { sendEvent } = require('../events/producer');

// @desc    Register user
// @route   POST /api/users/register
// @access  Public
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Create user
        const user = await User.create({
            name,
            email,
            password
        });
        
        // Dispatch event softly
        sendEvent('user.registered', user).catch(e => console.error('Kafka send err:', e.message));

        sendTokenResponse(user, 201, res);
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate email & password
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide an email and password' });
        }

        // Check for user
        let user = await User.findOne({ email }).select('+password');

        if (!user) {
            // Check if it's an admin trying to log in
            user = await Admin.findOne({ email }).select('+password');
            if (user) {
                user.role = 'admin'; // Ensure role is present for JWT
            }
        }

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        sendTokenResponse(user, 200, res);
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

// @desc    Get current logged in user
// @route   GET /api/users/me
// @access  Private
exports.getMe = async (req, res) => {
    let user;
    if (req.user.role === 'admin' || req.admin) {
        user = await Admin.findById(req.user.id);
        if (user) user = { ...user.toObject(), role: 'admin' };
    } else {
        user = await User.findById(req.user.id);
    }

    res.status(200).json({
        success: true,
        data: user
    });
};

// @desc    Update user details
// @route   PUT /api/users/updatedetails
// @access  Private
exports.updateDetails = async (req, res) => {
    const fieldsToUpdate = {
        name: req.body.name,
        email: req.body.email
    };
    if (req.body.bio !== undefined) fieldsToUpdate.bio = req.body.bio;
    if (req.body.avatar !== undefined) fieldsToUpdate.avatar = req.body.avatar;

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: user
    });
};

// @desc    Toggle liked package
// @route   POST /api/users/liked/:id
// @access  Private
exports.toggleLikedPackage = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const packageId = req.params.id;

        const isLiked = user.likedPackages.includes(packageId);

        if (isLiked) {
            user.likedPackages = user.likedPackages.filter(id => id.toString() !== packageId);
        } else {
            user.likedPackages.push(packageId);
        }

        await user.save();
        res.status(200).json({ success: true, data: user.likedPackages });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Get liked packages
// @route   GET /api/users/liked
// @access  Private
exports.getLikedPackages = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('likedPackages');
        res.status(200).json({ success: true, data: user.likedPackages });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Get user bookings
// @route   GET /api/users/bookings
// @access  Private
exports.getUserBookings = async (req, res) => {
    try {
        const Booking = require('../models/Booking');
        const bookings = await Booking.find({ user: req.user.id }).populate('packageId');
        res.status(200).json({ success: true, data: bookings });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Upload gallery images
// @route   POST /api/users/gallery
// @access  Private
exports.uploadGalleryImage = async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            user = await Admin.findById(req.user.id);
        }
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        
        if (!req.body.imageUrl) {
            return res.status(400).json({ success: false, message: 'Please provide an image url' });
        }

        // Initialize gallery array if it doesn't exist on Admin model
        if (!user.gallery) {
            user.gallery = [];
        }

        user.gallery.push(req.body.imageUrl);
        await user.save();

        // Automatically create a Testimonial to display this media publicly
        const Testimonial = require('../models/Testimonial');
        const quoteText = req.body.quote && req.body.quote.trim() !== '' 
            ? req.body.quote.trim() 
            : 'Shared an amazing moment from their Travel Gallery.';

        await Testimonial.create({
            name: user.name || user.username || 'Anonymous Traveler',
            rating: 5, // Default rating for gallery posts
            review: quoteText,
            image: req.body.imageUrl,
            user: user._id,
            status: 'approved' // Automatically approved so it's instantly visible
        });

        res.status(200).json({ success: true, data: user.gallery });
    } catch (err) {
        console.error("Gallery Upload Error:", err);
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private (Admin)
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: users.length, data: users });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private (Admin)
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(
            Date.now() + parseInt(process.env.JWT_EXPIRE, 10) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res
        .status(statusCode)
        .json({
            success: true,
            token
        });
};
