// src/models/Link.js
import { DataTypes } from 'sequelize';
import { sequelize } from '#config/database.js';

const Link = sequelize.define(
  'Link',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    platform: {
      type: DataTypes.ENUM(
        'facebook',
        'twitter',
        'instagram',
        'youtube',
        'tiktok',
        'telegram',
        'linkedin',
        'github',
        'whatsapp',
        'website'
      ),
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
  },
  {
    tableName: 'links',
    timestamps: true,
  }
);

export default Link;
