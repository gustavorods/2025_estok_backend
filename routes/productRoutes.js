const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Router to get all the product history 
router.get('/get-history', productController.getHistoryData);

// Router to get all expired product
router.get('/get-expired-product', productController.getExpiredProduct);

module.exports = router;