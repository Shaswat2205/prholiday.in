const express = require('express');
const { globalSearch, sendSearchRequestEmail } = require('../controllers/searchController');
const router = express.Router();

router.get('/', globalSearch);
router.post('/request', sendSearchRequestEmail);

module.exports = router;
