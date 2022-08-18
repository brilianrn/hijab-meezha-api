'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Role.hasMany(models.Admin, { foreignKey: 'roleId' });
    }
  }
  Role.init(
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
            msg: 'Role name is not allowed to be empty',
          },
        },
        unique: {
          args: true,
          msg: 'Role name already exists',
        },
      },
      code: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Role code is not allowed to be empty',
          },
        },
        unique: {
          args: true,
          msg: 'Role code already exists',
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
    },
    {
      sequelize,
      modelName: 'Role',
      hooks: {
        beforeCreate: (role, opt) => {
          role.isActive = true;
        },
      },
    }
  );
  return Role;
};
