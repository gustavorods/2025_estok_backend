const express = require('express');
const router = express.Router();
const iotController = require('../controllers/iotController')

// Route that receives the epc from the iot and displays it on the console (just for teste)
// router.post('/get-epc', iotController);

// Route that update product hisotry when reader identifies changes in the RFID tag
router.post('/updateProductHistory', iotController.updateHistory);

module.exports = router;