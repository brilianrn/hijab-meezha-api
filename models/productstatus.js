'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductStatus.belongsTo(models.Admin, { foreignKey: 'createdBy' });
      ProductStatus.belongsTo(models.Admin, { foreignKey: 'updatedBy' });
    }
  }
  ProductStatus.init(
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
            msg: 'Product status name is not allowed to be empty',
          },
        },
      },
      code: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Product status code is not allowed to be empty',
          },
        },
        unique: {
          args: true,
          msg: 'Product status code already exists',
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
      modelName: 'ProductStatus',
      hooks: {
        beforeCreate: (productStatus, opt) => {
          productStatus.isActive = true;
        },
      },
    }
  );
  return ProductStatus;
};
