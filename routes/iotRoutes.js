const express = require('express');
const router = express.Router();
const iotController = require('../controllers/iotController')

// Route that receives the epc from the iot and displays it on the console
router.post('/get-epc', iotController);

module.exports = router;