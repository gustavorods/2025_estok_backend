// models/employeeModel.js
const db = require('../database/db');

async function insertEmployee(name, email, passwordHash, genderCod) {
  const insertQuery = `
    INSERT INTO funcionario (nome, email, senha, cod_genero)
    VALUES (?, ?, ?, ?)
  `;

  const [result] = await db.execute(insertQuery, [name, email, passwordHash, genderCod]);
  return result;
}

module.exports = { insertEmployee };
