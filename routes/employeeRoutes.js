const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.post('/create-employee', employeeController.createEmployee);
router.get('/get-employees', employeeController.getAllEmployees);

module.exports = router;