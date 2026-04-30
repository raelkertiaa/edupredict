const mysql2 = require("mysql2/promise");
require("dotenv").config();

const pool = mysql2.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "edupredict",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test koneksi saat server start
pool
  .getConnection()
  .then(conn => {
    console.log("Database Connected");
    conn.release();
  })
  .catch(err => {
    console.error("Database Connection Failed:", err.message);
  });

module.exports = pool;
