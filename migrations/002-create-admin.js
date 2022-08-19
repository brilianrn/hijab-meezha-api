'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Admins', {
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      roleId: {
        type: Sequelize.UUID,
        references: {
          model: 'Roles',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      username: {
        type: Sequelize.STRING(50),
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fullname: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      photoProfile: {
        type: Sequelize.STRING,
      },
      phoneNumber: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true,
      },
      gender: {
        type: Sequelize.STRING(10),
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
    await queryInterface.dropTable('Admins');
  },
};
