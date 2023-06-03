"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.ProductSize, { foreignKey: "productSizeId" });
      Cart.belongsTo(models.User, { foreignKey: "userId" });
      Cart.belongsTo(models.Category, { foreignKey: "categoryId" });
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
          msg: "Exist ID!",
        },
      },
      productSizeId: {
        type: DataTypes.UUID,
        validate: {
          notEmpty: {
            args: true,
            msg: "Product Size ID is not allowed to be empty",
          },
        },
      },
      userId: {
        type: DataTypes.UUID,
        validate: {
          notEmpty: {
            args: true,
            msg: "User ID is not allowed to be empty",
          },
        },
      },
      categoryId: {
        type: DataTypes.UUID,
        validate: {
          notEmpty: {
            args: true,
            msg: "Category ID is not allowed to be empty",
          },
        },
      },
      qty: {
        type: DataTypes.FLOAT,
        validate: {
          notEmpty: {
            args: true,
            msg: "Quantity is not allowed to be empty",
          },
        },
      },
      isActive: {
        type: DataTypes.UUID,
        validate: {
          notEmpty: {
            args: true,
            msg: "Status active is not allowed to be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Cart",
      hooks: {
        beforeCreate: (cart, opt) => {
          cart.isActive = true;
        },
      },
    }
  );
  return Cart;
};
