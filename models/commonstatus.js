'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommonStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CommonStatus.belongsTo(models.Admin, { foreignKey: 'createdBy' });
      CommonStatus.belongsTo(models.Admin, { foreignKey: 'updatedBy' });

      CommonStatus.hasMany(models.Order, { foreignKey: 'orderStatusId' });
    }
  }
  CommonStatus.init(
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
      type: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Status type is not allowed to be empty',
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Status name is not allowed to be empty',
          },
        },
      },
      code: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Status code is not allowed to be empty',
          },
        },
        unique: {
          args: true,
          msg: 'Status code already exists',
        },
      },
      isActive: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Status active is not allowed to be empty',
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
      modelName: 'CommonStatus',
      hooks: {
        beforeCreate: (commonStatus, opt) => {
          commonStatus.isActive = true;
        },
      },
    }
  );
  return CommonStatus;
};
