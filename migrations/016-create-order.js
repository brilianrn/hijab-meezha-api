'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      productId: {
        type: Sequelize.UUID,
        references: {
          model: 'Products',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      orderStatusId: {
        type: Sequelize.UUID,
        references: {
          model: 'CommonStatuses',
          key: 'id',
        },
      },
      orderTaxId: {
        type: Sequelize.UUID,
        references: {
          model: 'Taxes',
          key: 'id',
        },
      },
      destinationAddressId: {
        type: Sequelize.UUID,
        references: {
          model: 'Addresses',
          key: 'id',
        },
      },
      categoryId: {
        type: Sequelize.UUID,
        references: {
          model: 'Categories',
          key: 'id',
        },
      },
      qty: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      orderCode: {
        type: Sequelize.STRING(300),
        allowNull: false,
        unique: true,
      },
      proofOfPaymentUrlImg: {
        type: Sequelize.STRING(300),
      },
      remarks: {
        type: Sequelize.STRING(300),
      },
      cancelReason: {
        type: Sequelize.STRING(300),
      },
      orderDate: {
        type: Sequelize.DATE,
      },
      paymentDate: {
        type: Sequelize.DATE,
      },
      pickUpDate: {
        type: Sequelize.DATE,
      },
      completedDate: {
        type: Sequelize.DATE,
      },
      receiptNumber: {
        type: Sequelize.STRING(300),
      },
      deliveryPlatformName: {
        type: Sequelize.STRING(300),
      },
      deliveryId: {
        type: Sequelize.STRING(300),
      },
      deliveryDriverName: {
        type: Sequelize.STRING(300),
      },
      deliveryDriverPoliceNumber: {
        type: Sequelize.STRING(300),
      },
      deliveryFee: {
        type: Sequelize.FLOAT,
      },
      receiverName: {
        type: Sequelize.STRING(300),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  },
};
