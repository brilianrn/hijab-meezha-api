'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArticleCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ArticleCategory.belongsTo(models.Admin, { foreignKey: 'updatedBy' });
      ArticleCategory.belongsTo(models.Admin, { foreignKey: 'updatedBy' });

      ArticleCategory.hasMany(models.Article, {
        foreignKey: 'articleCategoryId',
      });
    }
  }
  ArticleCategory.init(
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
            msg: 'Name is not allowed to be empty',
          },
        },
      },
      image: {
        type: DataTypes.STRING,
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
      code: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Article category code is not allowed to be empty',
          },
        },
        unique: {
          args: true,
          msg: 'Article category code already exist',
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
        hooks: {
          beforeCreate: (articleCat, opt) => {
            articleCat.isActive = true;
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'ArticleCategory',
      hooks: {
        beforeCreate: (category, opt) => {
          category.isActive = true;
        },
      },
    }
  );
  return ArticleCategory;
};
