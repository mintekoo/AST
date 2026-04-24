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
    phone: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
      get() {
        const raw = this.getDataValue('phone');
        try {
          return typeof raw === 'string' ? JSON.parse(raw) : raw;
        } catch {
          return raw;
        }
      },
    },
    email: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
      get() {
        const raw = this.getDataValue('email');
        try {
          return typeof raw === 'string' ? JSON.parse(raw) : raw;
        } catch {
          return raw;
        }
      },
    },
    web: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
      get() {
        const raw = this.getDataValue('web');
        try {
          return typeof raw === 'string' ? JSON.parse(raw) : raw;
        } catch {
          return raw;
        }
      },
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 7),
      allowNull: true,
      validate: {
        min: -90,
        max: 90,
      },
    },
    longitude: {
      type: DataTypes.DECIMAL(10, 7),
      allowNull: true,
      validate: {
        min: -180,
        max: 180,
      },
    },
  },
  {
    tableName: 'locations',
    timestamps: true,
  }
);

export default Location;
