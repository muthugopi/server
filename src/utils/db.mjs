import mysql from 'mysql2';
import dotenv from 'dotenv';
import logger from './logger.mjs';

dotenv.config(); // Load .env variables

// Create MySQL pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

db.getConnection((err, connection) => {
    if (err) {
        logger.error("Error inside the DB ")
        console.error("Database connection failed:", err);
    } else {
        logger.info("Server Connected Successfully !");
        connection.release();
    }
});

export default db;
