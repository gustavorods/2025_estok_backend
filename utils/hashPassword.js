const bcrypt = require('bcrypt');

/**
 * Hashes a plain text password using bcrypt.
 * @param {string} password - The plain text password to hash.
 * @returns {Promise<string>} The hashed password.
 */

async function hashPassword(password) {
  const saltRounds = 10; // defines how strong the hashing will be
  const hashed = await bcrypt.hash(password, saltRounds);
  return hashed;
}

module.exports = hashPassword;