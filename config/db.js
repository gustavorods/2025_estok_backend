const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuring mysql using pool to improve performance
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,

    // SSL: using CA provide by aiven
    ssl: {
        ca: process.env.DB_CA // read the CA content
    }
});

// // test to make sure tha the serve is working!
// async function testConnection() {
//     try {
//         const conn = await pool.getConnection();
//         console.log('✅ Connection working :)');
//         conn.release();
//     } catch (error) {
//         console.log(`❌ Connection error: ${error.message}`)
//     }
// }

testConnection();

module.exports = pool;