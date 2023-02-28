'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Address.belongsTo(models.User, { foreignKey: 'userId' });
      Address.belongsTo(models.User, { foreignKey: 'updatedBy' });
      Address.belongsTo(models.User, { foreignKey: 'updatedBy' });

      Address.hasMany(models.Order, { foreignKey: 'destinationAddressId' });
    }
  }
  Address.init(
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
      userId: {
        type: DataTypes.UUID,
        validate: {
          notEmpty: {
            args: true,
            msg: 'User ID is not allowed to be empty',
          },
        },
      },
      addressName: DataTypes.STRING,
      street: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Street is not allowed to be empty',
          },
        },
      },
      rt: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'RT is not allowed to be empty',
          },
        },
      },
      rw: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'RW is not allowed to be empty',
          },
        },
      },
      village: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Village is not allowed to be empty',
          },
        },
      },
      district: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'District is not allowed to be empty',
          },
        },
      },
      city: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'City is not allowed to be empty',
          },
        },
      },
      province: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Province is not allowed to be empty',
          },
        },
      },
      country: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Country is not allowed to be empty',
          },
        },
      },
      postCode: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Post code is not allowed to be empty',
          },
        },
      },
      isMainAddress: {
        type: DataTypes.BOOLEAN,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Is Main Address is not allowed to be empty',
          },
        },
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Active status is not allowed to be empty',
          },
        },
      },
      provinceId: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Province ID is not allowed to be empty',
          },
        },
      },
      cityId: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'City ID is not allowed to be empty',
          },
        },
      },
      districtId: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'District ID is not allowed to be empty',
          },
        },
      },
      villageId: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Village ID is not allowed to be empty',
          },
        },
      },
      postCodeId: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Postcode ID is not allowed to be empty',
          },
        },
      },
      createdBy: {
        type: DataTypes.UUID,
        validate: {
          notEmpty: {
            args: true,
            msg: 'User ID is not allowed to be empty',
          },
        },
      },
      updatedBy: {
        type: DataTypes.UUID,
        validate: {
          notEmpty: {
            args: true,
            msg: 'User ID is not allowed to be empty',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Address',
      hooks: {
        beforeCreate: (commonStatus, opt) => {
          commonStatus.isActive = true;
        },
      },
    }
  );
  return Address;
};
