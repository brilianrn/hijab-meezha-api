'use strict';
const { Model } = require('sequelize');
const { hashPassword } = require('../utils/bycript');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.OtpCode, { foreignKey: 'user_id' });
      User.hasMany(models.Cart, { foreignKey: 'userId' });
      User.hasMany(models.Address, { foreignKey: 'userId' });
      User.hasMany(models.Order, { foreignKey: 'userId' });
      User.hasMany(models.Address, { foreignKey: 'createdBy' });
      User.hasMany(models.Address, { foreignKey: 'updatedBy' });
    }
  }
  User.init(
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
      photoProfile: {
        type: DataTypes.STRING,
      },
      phoneNumber: {
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
      modelName: 'User',
      hooks: {
        beforeCreate: (user, opt) => {
          user.password = hashPassword(user.password);
          user.isActive = false;
        },
      },
    }
  );
  return User;
};
