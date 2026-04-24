// src/models/Project.js
import { DataTypes } from 'sequelize';
import { sequelize } from '#config/database.js';

const Project = sequelize.define(
  'Project',
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
    tableName: 'projects',
    timestamps: true,
  }
);

export default Project;
