const express = require('express');
const { loginAdmin, getMe, getDashboardStats } = require('../controllers/adminController');
const { protect } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Log in an admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Admin logged in successfully
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', loginAdmin);

/**
 * @swagger
 * /api/admin/me:
 *   get:
 *     summary: Get currently logged in admin details
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin details retrieved successfully
 */
router.get('/me', protect, getMe);
router.get('/stats', protect, getDashboardStats);

module.exports = router;
