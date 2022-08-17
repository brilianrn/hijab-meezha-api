'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Promo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Promo.belongsTo(models.User, { foreignKey: 'createdBy' });
      Promo.belongsTo(models.User, { foreignKey: 'updatedBy' });
    }
  }
  Promo.init(
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
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Promo name is not allowed to be empty',
          },
        },
      },
      description: { type: DataTypes.STRING },
      code: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Promo code is not allowed to be empty',
          },
        },
        unique: {
          args: true,
          msg: 'Promo code already exists',
        },
      },
      photo: { type: DataTypes.STRING },
      expiredDate: {
        type: DataTypes.DATE,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Expired date is not allowed to be empty',
          },
        },
      },
      amount: {
        type: DataTypes.FLOAT,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Promo amount is not allowed to be empty',
          },
        },
      },
      createdBy: {
        type: DataTypes.UUID,
        validate: {
          notEmpty: {
            args: true,
            msg: 'User ID is not allowed to be empty',
          },
        },
      },
      updatedBy: {
        type: DataTypes.UUID,
        validate: {
          notEmpty: {
            args: true,
            msg: 'User ID is not allowed to be empty',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Promo',
    }
  );
  return Promo;
};
