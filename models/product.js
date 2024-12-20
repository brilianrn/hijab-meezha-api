"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category, { foreignKey: "categoryId" });
      Product.belongsTo(models.Tax, { foreignKey: "taxId" });
      Product.belongsTo(models.ProductStatus, {
        foreignKey: "productStatusId",
      });
      Product.belongsTo(models.Admin, { foreignKey: "updatedBy" });
      Product.belongsTo(models.Admin, { foreignKey: "updatedBy" });

      Product.hasMany(models.ProductThumbnail, { foreignKey: "productId" });
      Product.hasMany(models.ProductImage, { foreignKey: "productId" });
      // Product.hasMany(models.Cart, { foreignKey: "productId" });
      // Product.hasMany(models.OrderProduct, { foreignKey: "productId" });
      Product.hasMany(models.ProductSize, { foreignKey: "productId" });
    }
  }
  Product.init(
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
      categoryId: {
        type: DataTypes.UUID,
        validate: {
          notEmpty: {
            args: true,
            msg: "Category ID is not allowed to be empty",
          },
        },
      },
      taxId: {
        type: DataTypes.UUID,
        validate: {
          notEmpty: {
            args: true,
            msg: "Tax ID is not allowed to be empty",
          },
        },
      },
      productStatusId: {
        type: DataTypes.UUID,
        validate: {
          notEmpty: {
            args: true,
            msg: "Product Status ID is not allowed to be empty",
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Name is not allowed to be empty",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Description is not allowed to be empty",
          },
        },
      },
      totalStock: {
        type: DataTypes.FLOAT,
        validate: {
          notEmpty: {
            args: true,
            msg: "Stock is not allowed to be empty",
          },
        },
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        validate: {
          notEmpty: {
            args: true,
            msg: "Is active is not allowed to be empty",
          },
        },
      },
      code: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Product code is not allowed to be empty",
          },
        },
        unique: {
          args: true,
          msg: "Product code already exist",
        },
      },
      createdBy: {
        type: DataTypes.UUID,
        validate: {
          notEmpty: {
            args: true,
            msg: "Admin ID is not allowed to be empty",
          },
        },
      },
      updatedBy: {
        type: DataTypes.UUID,
        validate: {
          notEmpty: {
            args: true,
            msg: "Admin ID is not allowed to be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
      hooks: {
        beforeCreate: (product, opt) => {
          product.isActive = true;
        },
      },
    }
  );
  return Product;
};
