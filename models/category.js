'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.belongsTo(models.Admin, { foreignKey: 'createdBy' });
      Category.belongsTo(models.Admin, { foreignKey: 'updatedBy' });
    }
  }
  Category.init(
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
            msg: 'Category name is not allowed to be empty',
          },
        },
      },
      description: { type: DataTypes.STRING },
      photo: { type: DataTypes.STRING },
      createdBy: {
        type: DataTypes.UUID,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Admin ID is not allowed to be empty',
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
      modelName: 'Category',
      hooks: {
        beforeCreate: (category, opt) => {
          category.isActive = true;
        },
      },
    }
  );
  return Category;
};
