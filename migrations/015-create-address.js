"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Addresses", {
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id",
        },
        allowNull: false,
        onUpdate: "CASCADE",
      },
      addressName: {
        type: Sequelize.STRING(300),
      },
      street: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },
      rt: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      rw: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      village: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },
      district: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },
      province: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },
      postCode: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      isMainAddress: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      isActive: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("Addresses");
  },
};
