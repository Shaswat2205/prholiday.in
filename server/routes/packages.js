const express = require('express');
const {
    getPackages,
    getPackage,
    createPackage,
    updatePackage,
    deletePackage,
    extractPackageData
} = require('../controllers/packageController');
const { protect, authorize } = require('../middleware/auth');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

// Public routes
/**
 * @swagger
 * /api/packages:
 *   get:
 *     summary: Get all packages
 *     tags: [Packages]
 *     responses:
 *       200:
 *         description: List of packages retrieved successfully
 */
router.get('/', getPackages);

/**
 * @swagger
 * /api/packages/{id}:
 *   get:
 *     summary: Get a single package by ID
 *     tags: [Packages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Package ID
 *     responses:
 *       200:
 *         description: Package retrieved successfully
 *       404:
 *         description: Package not found
 */
router.get('/:id', getPackage);

// Protected routes (Admin)
router.post('/extract-from-document', protect, authorize('admin'), upload.single('document'), extractPackageData);
router.post('/', protect, authorize('admin'), createPackage);
router.put('/:id', protect, authorize('admin'), updatePackage);
router.delete('/:id', protect, authorize('admin'), deletePackage);

module.exports = router;
