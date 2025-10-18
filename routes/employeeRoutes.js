const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.post('/create-employee', employeeController.createEmployee);

module.exports = router;