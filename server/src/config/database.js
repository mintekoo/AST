// src/config/database.js
import { Sequelize } from 'sequelize';
import mysql from 'mysql2/promise';
import { Logger } from 'winston';

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// ✅ Function to create database if it doesn't exist
export const createDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
    });

    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
    );

    console.log(`✅ Database '${DB_NAME}' is ready.`);
    await connection.end();
  } catch (error) {
    Logger.error('❌ Database creation failed:', error.message);
    throw error;
  }
};

// ✅ Initialize Sequelize with utf8mb4
export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    charset: 'utf8mb4',
  },
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
    timestamps: true,
  },
});
