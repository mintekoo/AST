// src/models/Location.js
import { DataTypes } from 'sequelize';
import { sequelize } from '#config/database.js';

const Location = sequelize.define(
  'Location',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 7),
      allowNull: true,
    },
    longitude: {
      type: DataTypes.DECIMAL(10, 7),
      allowNull: true,
    },
  },
  {
    tableName: 'locations',
    timestamps: true,
  }
);

export default Location;
