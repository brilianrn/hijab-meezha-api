'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OtpCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OtpCode.belongsTo(models.User, { foreignKey: 'user_id' });
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
      },
      user_id: {
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
      expired_date: {
        type: DataTypes.DATE,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Expired date is not allowed to be empty',
          },
        },
      },
      is_active: {
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
          otpCode.is_active = true;
        },
      },
    }
  );
  return OtpCode;
};
