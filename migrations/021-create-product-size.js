"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ProductSizes", {
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
          model: "Products",
          key: "id",
        },
        allowNull: false,
      },
      sizeId: {
        type: Sequelize.UUID,
        references: {
          model: "Sizes",
          key: "id",
        },
        allowNull: false,
      },
      stock: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      priceAfterDiscount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      promoId: {
        type: Sequelize.UUID,
        references: {
          model: "Promos",
          key: "id",
        },
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      createdBy: {
        type: Sequelize.UUID,
        references: {
          model: "Admins",
          key: "id",
        },
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      updatedBy: {
        type: Sequelize.UUID,
        references: {
          model: "Admins",
          key: "id",
        },
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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
    await queryInterface.dropTable("ProductSizes");
  },
};
