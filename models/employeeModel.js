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

async function getEmployees() {
  const selectQuery = 'SELECT * FROM funcionario';
  const [rows] = await db.execute(selectQuery);
  return rows;
}

async function getEmployeeByEmail(email) {
  const selectQuery = 'SELECT * FROM funcionario WHERE email = ?';
  const [rows] = await db.execute(selectQuery, [email]);
  return rows[0];
}

module.exports = { insertEmployee, getEmployees, getEmployeeByEmail};
