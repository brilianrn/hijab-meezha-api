'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tax extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tax.belongsTo(models.Admin, { foreignKey: 'createdBy' });
      Tax.belongsTo(models.Admin, { foreignKey: 'updatedBy' });

      Tax.hasMany(models.Order, { foreignKey: 'orderTaxId' });
    }
  }
  Tax.init(
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
            msg: 'Tax name is not allowed to be empty',
          },
        },
      },
      amount: {
        type: DataTypes.FLOAT,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Tax amount is not allowed to be empty',
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
      createdBy: {
        type: DataTypes.UUID,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Admin ID is not allowed to be empty',
          },
        },
      },
      updatedBy: {
        type: DataTypes.UUID,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Admin ID is not allowed to be empty',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Tax',
      hooks: {
        beforeCreate: (category, opt) => {
          category.isActive = true;
        },
      },
    }
  );
  return Tax;
};
