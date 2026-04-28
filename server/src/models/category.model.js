// src/models/Category.js
import { DataTypes } from 'sequelize';
import { sequelize } from '#config/database.js';

const Category = sequelize.define(
  'Category',
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
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    typeIs: {
      type: DataTypes.ENUM('project', 'blog'),
      allowNull: true,
      defaultValue: 'project',
    },
  },
  {
    tableName: 'categories',
    timestamps: true,
  }
);

export default Category;
