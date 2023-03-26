"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("CommonStatuses", {
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      type: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(250),
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false,
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
        onUpdate: "CASCADE",
      },
      updatedBy: {
        type: Sequelize.UUID,
        references: {
          model: "Admins",
          key: "id",
        },
        allowNull: false,
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
    await queryInterface.dropTable("CommonStatuses");
  },
};
