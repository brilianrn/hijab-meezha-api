"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductSize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductSize.belongsTo(models.Product, { foreignKey: "productId" });
      ProductSize.belongsTo(models.Size, { foreignKey: "sizeId" });
      ProductSize.belongsTo(models.Promo, { foreignKey: "promoId" });
    }
  }
  ProductSize.init(
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
      productId: {
        type: DataTypes.UUID,
        validate: {
          notEmpty: {
            args: true,
            msg: "Product ID is not allowed to be empty",
          },
        },
      },
      sizeId: {
        type: DataTypes.UUID,
        validate: {
          notEmpty: {
            args: true,
            msg: "Size ID is not allowed to be empty",
          },
        },
      },
      stock: {
        type: DataTypes.FLOAT,
        validate: {
          notEmpty: {
            args: true,
            msg: "Quantity is not allowed to be empty",
          },
        },
      },
      price: {
        type: DataTypes.FLOAT,
        validate: {
          notEmpty: {
            args: true,
            msg: "Price is not allowed to be empty",
          },
        },
      },
      priceAfterDiscount: {
        type: DataTypes.FLOAT,
        validate: {
          notEmpty: {
            args: true,
            msg: "Price after discount is not allowed to be empty",
          },
        },
      },
      promoId: { type: DataTypes.UUID },
      isActive: {
        type: DataTypes.BOOLEAN,
        validate: {
          notEmpty: {
            args: true,
            msg: "Is active is not allowed to be empty",
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
      modelName: "ProductSize",
      hooks: {
        beforeCreate: (productSize, opt) => {
          productSize.isActive = true;
        },
      },
    }
  );
  return ProductSize;
};
