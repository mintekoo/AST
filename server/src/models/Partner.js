// src/models/Partner.js
import { DataTypes } from 'sequelize';
import { sequelize } from '#config/database.js';

const Partner = sequelize.define(
  'Partner',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'partners',
    timestamps: true,
  }
);

export default Partner;
