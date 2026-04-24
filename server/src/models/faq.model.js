// src/models/FAQ.js
import { DataTypes } from 'sequelize';
import { sequelize } from '#config/database.js';

const FAQ = sequelize.define(
  'FAQ',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'faqs',
    timestamps: true,
  }
);

export default FAQ;
