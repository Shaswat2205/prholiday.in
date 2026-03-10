const express = require('express');
const { register, login, getMe, updateDetails, toggleLikedPackage, getLikedPackages, getUserBookings, uploadGalleryImage, getUsers, deleteUser } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.post('/liked/:id', protect, toggleLikedPackage);
router.get('/liked', protect, getLikedPackages);
router.get('/bookings', protect, getUserBookings);
router.post('/gallery', protect, uploadGalleryImage);

// Admin routes
router.get('/', protect, authorize('admin'), getUsers);
router.delete('/:id', protect, authorize('admin'), deleteUser);

module.exports = router;
