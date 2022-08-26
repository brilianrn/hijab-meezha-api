'use strict';
const { Model } = require('sequelize');
const { otpStatus } = require('../constants');
module.exports = (sequelize, DataTypes) => {
  class OtpCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OtpCode.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  OtpCode.init(
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
      userId: {
        type: DataTypes.UUID,
        validate: {
          notEmpty: {
            args: true,
            msg: 'User ID is not allowed to be empty',
          },
        },
      },
      token: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Token is not allowed to be empty',
          },
        },
        unique: {
          args: true,
          msg: 'Token already exists',
        },
      },
      type: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'OTP type is not allowed to be empty',
          },
          len: {
            args: [2],
            msg: 'Your otp type too short',
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'OTP status is not allowed to be empty',
          },
          len: {
            args: [2],
            msg: 'Your otp status too short',
          },
        },
      },
      expiredDate: {
        type: DataTypes.DATE,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Expired date is not allowed to be empty',
          },
        },
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        validate: {
          notEmpty: {
            args: true,
            msg: 'OTP status is not allowed to be empty',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'OtpCode',
      hooks: {
        beforeCreate: (otpCode, _opt) => {
          otpCode.isActive = true;
          otpCode.status = otpStatus.notConfirmed;
        },
      },
    }
  );
  return OtpCode;
};
