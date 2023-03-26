"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("Addresses", "addressNameReceiver", {
        type: Sequelize.STRING(100),
        allowNull: false,
      }),
      queryInterface.addColumn("Addresses", "addressPhoneReceiver", {
        type: Sequelize.STRING(100),
        allowNull: false,
      }),
      queryInterface.addColumn("Addresses", "provinceId", {
        type: Sequelize.STRING(100),
        allowNull: false,
      }),
      queryInterface.addColumn("Addresses", "cityId", {
        type: Sequelize.STRING(100),
        allowNull: false,
      }),
      queryInterface.addColumn("Addresses", "districtId", {
        type: Sequelize.STRING(100),
        allowNull: false,
      }),
      queryInterface.addColumn("Addresses", "villageId", {
        type: Sequelize.STRING(100),
        allowNull: false,
      }),
      queryInterface.addColumn("Addresses", "postCodeId", {
        type: Sequelize.STRING(100),
        allowNull: false,
      }),
      queryInterface.addColumn("Addresses", "shippingDestinationId", {
        type: Sequelize.STRING(100),
        allowNull: false,
      }),
      queryInterface.addColumn("Addresses", "createdBy", {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id",
        },
        allowNull: false,
        onUpdate: "CASCADE",
      }),
      queryInterface.addColumn("Addresses", "updatedBy", {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id",
        },
        allowNull: false,
        onUpdate: "CASCADE",
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
