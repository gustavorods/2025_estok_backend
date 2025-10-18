const db = require('../database/db');
const queryHelpers = require('../database/queryHelpers');
const generatePassword = require('../utils/generatePassword');
const welcomeEmployee = require('../email_template/welcomeEmployee')

// function to create employee in the database and send his data via email
async function createEmployee(name, email, gender_name) {
  const connection = await db.getConnection(); // create a dedicated connection

  try {
    // start a transaction
    await connection.beginTransaction();

    // get gender code
    const gender_cod = await queryHelpers.getGenderCodeByName(gender_name);

    // generate password
    const { password, hash } = generatePassword();

    // insert employee
    const insertQuery = `
      INSERT INTO funcionario (nome, email, senha, cod_genero)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await connection.execute(insertQuery, [name, email, hash, gender_cod]);

    if (result.affectedRows === 0) {
      throw new Error('Failed to create employee');
    }

    // send welcome email
    const emailResult = await welcomeEmployee(name, email, password);

    if (!emailResult.status) {
      throw new Error('Employee created but failed to send welcome email');
    }

    // everything succeeded → commit transaction
    await connection.commit();

    console.log('✅ Employee created and welcome email sent successfully');
    return {
      status: true,
      message: 'Employee created and welcome email sent successfully'
    };

  } catch (error) {
    // something went wrong → rollback changes
    await connection.rollback();
    console.log(`❌ Transaction rolled back: ${error.message}`);

    return {
      status: false,
      message: error.message
    };

  } finally {
    // release connection back to the pool
    connection.release();
  }
}

module.exports = { createEmployee };
