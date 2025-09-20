const db = require('../config/db');

// Function that return all product historical 
async function getHistorical() {
    const query = ` 
    SELECT 
        h.id,
        h.horario_alteracao,
        s.nome_status,
        i.epc_id,
        p.nome_produto,
        t.nome_tipo,
        m.nome_marca,
        i.validade,
        COUNT(*) OVER(PARTITION BY p.nome_produto, t.nome_tipo, m.nome_marca) AS quantidade
    FROM historico h
    JOIN status s ON h.cod_status = s.cod_status
    JOIN item i ON h.cod_item = i.cod_item
    JOIN produto p ON i.cod_produto = p.cod_produto
    JOIN tipo t ON i.cod_tipo = t.cod_tipo
    JOIN marca m ON i.cod_marca = m.cod_marca;
    `;
    
    // We are destructuring the array to get just the rows and not the fields
    const [rows] = await db.execute(query); // taking the 20 most recent
    return rows;
}

module.exports = {getHistorical}