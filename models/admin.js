'use strict';
const { Model } = require('sequelize');
const { hashPassword } = require('../utils/bycript');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Admin.hasMany(models.Category, { foreignKey: 'createdBy' });
      Admin.hasMany(models.Category, { foreignKey: 'updatedBy' });
      Admin.hasMany(models.Size, { foreignKey: 'createdBy' });
      Admin.hasMany(models.Size, { foreignKey: 'updatedBy' });
      Admin.hasMany(models.Promo, { foreignKey: 'createdBy' });
      Admin.hasMany(models.Promo, { foreignKey: 'updatedBy' });
      Admin.hasMany(models.Tax, { foreignKey: 'createdBy' });
      Admin.hasMany(models.Tax, { foreignKey: 'updatedBy' });
      Admin.hasMany(models.ProductStatus, { foreignKey: 'createdBy' });
      Admin.hasMany(models.ProductStatus, { foreignKey: 'updatedBy' });
      Admin.hasMany(models.Product, { foreignKey: 'createdBy' });
      Admin.hasMany(models.Product, { foreignKey: 'updatedBy' });

      Admin.belongsTo(models.Role, { foreignKey: 'roleId' });
    }
  }
  Admin.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        autoIncrement: false,
        unique: {
          args: true,
          msg: 'Exist ID!',
        },
      },
      roleId: {
        type: DataTypes.UUID,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Role ID is not allowed to be empty',
          },
        },
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Status user is not allowed to be empty',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Email is not allowed to be empty',
          },
          isEmail: {
            args: true,
            msg: 'Invalid email',
          },
        },
        unique: {
          args: true,
          msg: 'Email already exists',
        },
      },
      username: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: 'Username has already exists',
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Password is not allowed to be empty',
          },
          len: {
            args: [5],
            msg: 'Your password too short',
          },
        },
      },
      fullname: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Fullname is not allowed to be empty',
          },
        },
      },
      photo_profile: {
        type: DataTypes.STRING,
      },
      phone_number: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Phone number is not allowed to be empty',
          },
          len: {
            args: [8, 12],
            msg: 'Invalid phone number',
          },
        },
        unique: {
          args: true,
          msg: 'Phone number has already exists',
        },
      },
      gender: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Admin',
      hooks: {
        beforeCreate: (admin, opt) => {
          admin.password = hashPassword(admin.password);
          admin.isActive = true;
        },
      },
    }
  );
  return Admin;
};
