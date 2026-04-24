import { DataTypes } from 'sequelize';
import { sequelize } from '#config/database.js';
import bcrypt from 'bcrypt';

const Admin = sequelize.define(
  'Admin',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'admins',
    timestamps: true,

    defaultScope: {
      attributes: { exclude: ['password'] },
    },

    scopes: {
      withPassword: {
        attributes: { include: ['password'] },
      },
    },

    hooks: {
      // 🔐 Hash password before create
      beforeCreate: async admin => {
        if (admin.password) {
          const salt = await bcrypt.genSalt(10);
          admin.password = await bcrypt.hash(admin.password, salt);
        }
      },

      // 🔐 Hash password on update if changed
      beforeUpdate: async admin => {
        if (admin.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          admin.password = await bcrypt.hash(admin.password, salt);
        }
      },
    },
  }
);

/**
 * ========================
 * Instance Methods
 * ========================
 */
Admin.prototype.comparePassword = async function (plainPassword) {
  if (!this.password) {
    const adminWithPassword = await Admin.scope('withPassword').findByPk(
      this.id
    );
    if (!adminWithPassword) return false;
    this.password = adminWithPassword.password;
  }

  return bcrypt.compare(plainPassword, this.password);
};

export default Admin;
