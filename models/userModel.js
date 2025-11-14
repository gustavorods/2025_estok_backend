const db = require('../database/db');

async function getUserByEmail(email) {
  const selectQuery = 'SELECT * FROM gerente WHERE email = ?';
  const [rows] = await db.execute(selectQuery, [email]);
  return rows[0];
}

module.exports = { getUserByEmail };