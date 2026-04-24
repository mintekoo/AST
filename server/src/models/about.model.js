// src/models/About.js
import { DataTypes } from 'sequelize';
import { sequelize } from '#config/database.js';

const About = sequelize.define(
  'About',
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    vision: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    mission: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    values: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: 'abouts',
    timestamps: true,
  }
);

export default About;
