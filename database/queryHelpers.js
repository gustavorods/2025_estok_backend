const db = require('./db');

async function getGenderCodeByName(gender_name) {
    const query = `
        SELECT cod_genero 
        FROM genero 
        WHERE descricao = ?;
    `;
    const [rows] = await db.execute(query, [gender_name]);
    if (rows.length === 0) {
        console.log(`❌ Gender not found`);
        throw new Error(`Gender not found: ${gender_name}`);
    }

    console.log(`✅ Gender code retrieved successfully`);
    return rows[0].cod_genero;
}

module.exports = { getGenderCodeByName };
