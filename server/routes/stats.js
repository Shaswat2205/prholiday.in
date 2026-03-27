const express = require('express');
const { getPublicStats } = require('../controllers/statsController');

const router = express.Router();

/**
 * @swagger
 * /api/stats:
 *   get:
 *     summary: Get public stats for home page
 *     tags: [Stats]
 *     responses:
 *       200:
 *         description: Stats retrieved successfully
 */
router.get('/', getPublicStats);

module.exports = router;
