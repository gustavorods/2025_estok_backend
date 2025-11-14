const authService = require('../services/authService');

async function login(req, res) {
    const { email, password } = req.body;
    try {
        const {accessToken, user} = await authService.login(email, password);
        res.status(200).json({accessToken, user});
    } catch (err) {
        res.status(err.status || 500).json({ message: 'login error' });
        console.log(err.message);
    }
}

module.exports = { login };