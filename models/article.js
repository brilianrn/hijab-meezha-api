'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Article.belongsTo(models.Admin, { foreignKey: 'updatedBy' });
      Article.belongsTo(models.Admin, { foreignKey: 'updatedBy' });
      Article.belongsTo(models.ArticleCategory, {
        foreignKey: 'articleCategoryId',
      });
    }
  }
  Article.init(
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
      articleCategoryId: {
        type: DataTypes.UUID,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Article category ID is not allowed to be empty',
          },
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
      content: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Content is not allowed to be empty',
          },
        },
      },
      image: {
        type: DataTypes.STRING,
      },
      viewers: {
        type: DataTypes.NUMBER,
      },
      likes: {
        type: DataTypes.NUMBER,
      },
      share: {
        type: DataTypes.NUMBER,
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
      isPublish: {
        type: DataTypes.BOOLEAN,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Is publish is not allowed to be empty',
          },
        },
      },
      publishedAt: {
        type: DataTypes.DATE,
      },
      unpublishedAt: {
        type: DataTypes.DATE,
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
      modelName: 'Article',
      hooks: {
        beforeCreate: (article, opt) => {
          article.isActive = true;
          article.viewers = 0;
          article.likes = 0;
          article.share = 0;
        },
      },
    }
  );
  return Article;
};
