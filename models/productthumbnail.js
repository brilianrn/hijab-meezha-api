'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductThumbnail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductThumbnail.belongsTo(models.Product, { foreignKey: 'productId' });
    }
  }
  ProductThumbnail.init(
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
      name: { type: DataTypes.UUID },
      url: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Product thumbnail url is not allowed to be empty',
          },
        },
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Is active is not allowed to be empty',
          },
        },
      },
      productId: {
        type: DataTypes.UUID,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Product ID is not allowed to be empty',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'ProductThumbnail',
      hooks: {
        beforeCreate: (productThumbnail, opt) => {
          productThumbnail.isActive = true;
        },
      },
    }
  );
  return ProductThumbnail;
};
