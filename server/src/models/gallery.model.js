// src/models/Gallery.js
import { DataTypes } from 'sequelize';
import { sequelize } from '#config/database.js';

const Gallery = sequelize.define(
  'Gallery',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    images: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
      get() {
        const raw = this.getDataValue('images');
        try {
          return typeof raw === 'string' ? JSON.parse(raw) : raw;
        } catch {
          return raw;
        }
      },
    },
  },
  {
    tableName: 'galleries',
    timestamps: true,
  }
);

export default Gallery;
