import mysql from 'mysql2';
import dotenv from 'dotenv';
import logger from './logger.mjs';
import { Sequelize } from 'sequelize';
import Student from '../../models/student.model.mjs';

dotenv.config(); // Load .env variables

// Create MySQL pool
export const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
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

// alter method for connectting DB 


export const sequelize = new Sequelize(
  process.env.DB_NAME,      
  process.env.DB_USER,      
  process.env.DB_PASSWORD,   
  {
    host: process.env.DB_HOST, 
    port: process.env.DB_PORT, 
    dialect: "mysql",
    logging: false
  }
);

try {
  await sequelize.authenticate();
  console.log("Sequelize DB connected");
  await sequelize.sync({alter:true});
  console.log("Table Synced !!");
} catch (err) {
  console.error("Connection failed", err);
}

