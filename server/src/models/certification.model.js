// src/models/Certification.js
import { DataTypes } from 'sequelize';
import { sequelize } from '#config/database.js';

const Certification = sequelize.define(
  'Certification',
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
    issuingOrganization: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    issueDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'certifications',
    timestamps: true,
  }
);

export default Certification;
