const bcrypt = require('bcrypt');

function generatePassword() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    let password = '';
    const length = 8;

    for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * characters.length);
        password += characters[index];
    }

    // Generate password hash
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);

    console.log(`✅ Password generated successfully`);
    return { password, hash };
}

module.exports = generatePassword;