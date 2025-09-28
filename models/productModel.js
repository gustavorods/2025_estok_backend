const db = require('../config/db');

// Function that returns the full product history
async function getHistory() {
    const query = ` 
        SELECT 
            h.id,
            h.horario_alteracao,   -- Timestamp of the change
            s.nome_status,         -- Status name (entered/exited)
            i.epc_id,              -- EPC code of the item
            p.nome_produto,        -- Product name
            t.nome_tipo,           -- Type name
            m.nome_marca,          -- Brand name
            i.validade,            -- Product expiration date
            (
                -- Subquery to count how many items of the same product/type/brand are currently present
                SELECT COUNT(*) 
                FROM item i2
                JOIN prateleira_status ps2 ON i2.cod_prateleira_status = ps2.cod_prateleira_status
                WHERE i2.cod_produto = p.cod_produto
                  AND i2.cod_tipo = t.cod_tipo
                  AND i2.cod_marca = m.cod_marca
                  AND ps2.nome_prateleira_status = 'presente'
            ) AS quantidade   -- Quantity of items currently on the shelf
        FROM historico h
        JOIN status s ON h.cod_status = s.cod_status
        JOIN item i ON h.cod_item = i.cod_item
        JOIN produto p ON i.cod_produto = p.cod_produto
        JOIN tipo t ON i.cod_tipo = t.cod_tipo
        JOIN marca m ON i.cod_marca = m.cod_marca
        JOIN prateleira_status ps ON i.cod_prateleira_status = ps.cod_prateleira_status
        ORDER BY h.horario_alteracao DESC;  -- Order by most recent changes first
    `;
    
    // Execute the query and get only the rows (without metadata)
    const [rows] = await db.execute(query); 
    return rows;
}

// Function to update a product's status in history and on the shelf
async function updateStatusProduct(epc, status) {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // Insert into history table
        const insertQuery = `
            INSERT INTO historico (cod_item, cod_status, horario_alteracao)
            SELECT 
                i.cod_item, 
                s.cod_status, 
                NOW()
            FROM item i
            JOIN status s ON s.nome_status = ?
            WHERE i.epc_id = ?;
        `;
        const [insertResult] = await connection.execute(insertQuery, [status, epc]);

        if (insertResult.affectedRows === 0) {
            throw new Error(`Item not found or invalid status: EPC=${epc}, Status=${status}`);
        }

        // Update the shelf status (present/absent)
        const updateQuery = `
            UPDATE item
            SET cod_prateleira_status = (
                SELECT cod_prateleira_status 
                FROM prateleira_status 
                WHERE nome_prateleira_status = ?
            )
            WHERE epc_id = ?;
        `;

        // Determine shelf status based on product status
        const newShelfStatus = status === 'entrou' ? 'presente' : 'ausente';
        await connection.execute(updateQuery, [newShelfStatus, epc]);

        await connection.commit();
        console.log(`✅ History and shelf updated for EPC=${epc}, Status=${status}`);
    } catch (err) {
        await connection.rollback();
        console.error("Error updating product status:", err.message);
    } finally {
        connection.release();
    }
}

// Function that return all the products 
async function getAllProducts() {
    const query = `
    SELECT 
        p.nome_produto AS produto,
        t.nome_tipo AS tipo,
        m.nome_marca AS marca,
        p.quantidade_maxima AS qtd_max,
        COUNT(i.cod_item) OVER (
            PARTITION BY p.cod_produto, t.cod_tipo, m.cod_marca
        ) AS qtd_atual,
        i.validade
    FROM item i
    JOIN produto p ON i.cod_produto = p.cod_produto
    JOIN tipo t ON i.cod_tipo = t.cod_tipo
    JOIN marca m ON i.cod_marca = m.cod_marca
    JOIN prateleira_status ps ON i.cod_prateleira_status = ps.cod_prateleira_status
    WHERE ps.nome_prateleira_status = 'presente';

    `;

    const[rows] = await db.execute(query);
    return rows;
}

 module.exports = { getHistory, updateStatusProduct, getAllProducts };
