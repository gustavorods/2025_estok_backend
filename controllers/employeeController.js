const employeeModel = require('../models/employeeModel');

// controller function to create employee
async function createEmployee(req, res) {
    const {name, email, gender_name} = req.body;

    const result = await employeeModel.createEmployee(name, email, gender_name);

    if (result.status) {
        return res.status(201).json({ message: result.message });
    } else {
        return res.status(500).json({ message: result.message });
    }
}

module.exports = { createEmployee };