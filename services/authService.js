// services/authService.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const employeeModel = require('../models/employeeModel');
const JWT_SECRET = process.env.JWT_SECRET;
const ACCESS_EXPIRES = process.env.ACCESS_EXPIRES;

async function login(email, password) {
    // Verify if user is employee or manager
    let type;
    let user = await userModel.getUserByEmail(email);
    if (!user) {
        user = await employeeModel.getEmployeeByEmail(email);
        if(!user) {
            throw { status: 401, message: 'Invalid credentials' };
        } else {
            type = 'employee';
        }
            
    } else {
        type = 'user';
    }
    const ok = await bcrypt.compare(password, user.senha);
    if (!ok) throw { status: 401, message: 'Invalid credentials' };

    const payload = { sub: user.id, email: user.email, typ: type || 'user' };
    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_EXPIRES });
    return { accessToken, user: { id: user.id, email: user.email } };
}

module.exports = { login };
