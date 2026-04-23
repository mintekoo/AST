// src/models/Term.js
import { DataTypes } from 'sequelize';
import { sequelize } from '#config/database.js';

const Term = sequelize.define(
  'Term',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'terms',
    timestamps: true,
  }
);

export default Term;
