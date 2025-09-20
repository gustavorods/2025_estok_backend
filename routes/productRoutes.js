const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Router to get all the product historical 
router.get('/get-historical', productController.getHistoricalData);

module.exports = router;