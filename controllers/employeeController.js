// controllers/employeeController.js
const { insertEmployee, getEmployees } = require('../models/employeeModel');
const queryHelpers = require('../database/queryHelpers');
const isValidEmail = require('../utils/validators/email');
const isValidPassword = require('../utils/validators/password');
const hashPassword = require('../utils/hashPassword');


async function createEmployee(req, res) {
  try {
    const { name, email, gender_name, password } = req.body;

    // ----------------------------
    // Basic validations
    // ----------------------------
    if (!name) return res.status(400).json({ status: false, message: 'Name is required' });
    if (!email) return res.status(400).json({ status: false, message: 'Email is required' });
    if (!password) return res.status(400).json({ status: false, message: 'Password is required' });

    if (!isValidEmail(email)) {
      return res.status(400).json({ status: false, message: 'Invalid email format' });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({ status: false, message: 'Password does not meet security requirements' });
    }

    // ----------------------------
    // Get gender code
    // ----------------------------
    const genderCod = await queryHelpers.getGenderCodeByName(gender_name);
    if (genderCod == null) {
      return res.status(400).json({ status: false, message: 'Invalid gender name' });
    }

    // ----------------------------
    // Hash password
    // ----------------------------
    const passwordHash = await hashPassword(password);

    // ----------------------------
    // Insert employee
    // ----------------------------
    const result = await insertEmployee(name, email, passwordHash, genderCod);

    // Success
    return res.status(201).json({
      status: true,
      message: 'Employee created successfully',
      id: result.insertId || null
    });

  } catch (error) {
    // ----------------------------
    // Handle duplicate email error
    // ----------------------------
    if (error.code === 'ER_DUP_ENTRY' || error.errno === 1062) {
      return res.status(409).json({ status: false, message: 'Email already in use' });
    }

    console.error('[CreateEmployee Error]', error);
    return res.status(500).json({ status: false, message: 'Internal server error' });
  }
}

async function getAllEmployees(req, res) {
  try {
    const employees = await getEmployees();
    return res.status(200).json({ status: true, data: employees });
  } catch (error) {
    console.error('[GetEmployees Error]', error);
    return res.status(500).json({ status: false, message: 'Internal server error' });
  }
}

module.exports = { createEmployee, getAllEmployees};
