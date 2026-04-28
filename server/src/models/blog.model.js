// src/models/Blog.js
import { DataTypes } from 'sequelize';
import { sequelize } from '#config/database.js';

const Blog = sequelize.define(
  'Blog',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categories',
        key: 'id',
      },
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'blogs',
    timestamps: true,

    indexes: [
      {
        fields: ['categoryId'],
      },
      {
        fields: ['createdAt'],
      },
    ],
  }
);

export default Blog;