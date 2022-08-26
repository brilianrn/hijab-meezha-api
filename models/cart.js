'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart.belongsTo(models.Product, { foreignKey: 'productId' });
      Cart.belongsTo(models.User, { foreignKey: 'userId' });
      Cart.belongsTo(models.Category, { foreignKey: 'categoryId' });
    }
  }
  Cart.init(
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
      productId: {
        type: DataTypes.UUID,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Product ID is not allowed to be empty',
          },
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
      categoryId: {
        type: DataTypes.UUID,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Category ID is not allowed to be empty',
          },
        },
      },
      qty: {
        type: DataTypes.FLOAT,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Quantity is not allowed to be empty',
          },
        },
      },
      isActive: {
        type: DataTypes.UUID,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Status active is not allowed to be empty',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Cart',
      hooks: {
        beforeCreate: (cart, opt) => {
          cart.isActive = true;
        },
      },
    }
  );
  return Cart;
};
