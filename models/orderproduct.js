"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrderProduct.belongsTo(models.Order, { foreignKey: "orderId" });
      OrderProduct.belongsTo(models.ProductSize, {
        foreignKey: "productSizeId",
      });
    }
  }
  OrderProduct.init(
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
            msg: "Product ID is not allowed to be empty",
          },
        },
      },
      orderId: {
        type: DataTypes.UUID,
        validate: {
          notEmpty: {
            args: true,
            msg: "Order ID is not allowed to be empty",
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
      createdBy: {
        type: DataTypes.UUID,
        validate: {
          notEmpty: {
            args: true,
            msg: "User ID is not allowed to be empty",
          },
        },
      },
      updatedBy: {
        type: DataTypes.UUID,
        validate: {
          notEmpty: {
            args: true,
            msg: "User ID is not allowed to be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "OrderProduct",
    }
  );
  return OrderProduct;
};
