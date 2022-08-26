'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.Product, { foreignKey: 'productId' });
      Order.belongsTo(models.User, { foreignKey: 'userId' });
      Order.belongsTo(models.CommonStatus, { foreignKey: 'orderStatusId' });
      Order.belongsTo(models.Tax, { foreignKey: 'orderTaxId' });
      Order.belongsTo(models.Address, { foreignKey: 'destinationAddressId' });
      Order.belongsTo(models.Category, { foreignKey: 'categoryId' });
      Order.belongsTo(models.Promo, { foreignKey: 'promoId' });
    }
  }
  Order.init(
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
      productId: {
        type: DataTypes.UUID,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Product ID is not allowed to be empty',
          },
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
      orderStatusId: DataTypes.UUID,
      orderTaxId: DataTypes.UUID,
      destinationAddressId: DataTypes.UUID,
      categoryId: DataTypes.UUID,
      promoId: DataTypes.UUID,
      qty: {
        type: DataTypes.FLOAT,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Quantity is not allowed to be empty',
          },
        },
      },
      orderCode: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Order code is not allowed to be empty',
          },
        },
        unique: {
          args: true,
          msg: 'Exist ID!',
        },
      },
      proofOfPaymentUrlImg: DataTypes.STRING,
      remarks: DataTypes.STRING,
      cancelReason: DataTypes.STRING,
      orderDate: DataTypes.DATE,
      paymentDate: DataTypes.DATE,
      pickUpDate: DataTypes.DATE,
      completedDate: DataTypes.DATE,
      receiptNumber: DataTypes.STRING,
      deliveryPlatformName: DataTypes.STRING,
      deliveryId: DataTypes.STRING,
      deliveryDriverName: DataTypes.STRING,
      deliveryDriverPoliceNumber: DataTypes.STRING,
      deliveryFee: DataTypes.FLOAT,
      receiverName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Order',
      hooks: {
        beforeCreate: (order, opt) => {
          order.isActive = true;
        },
      },
    }
  );
  return Order;
};
