'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(100),
      },
      photo: {
        type: Sequelize.STRING(150),
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      createdBy: {
        type: Sequelize.UUID,
        references: {
          model: 'Admins',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      updatedBy: {
        type: Sequelize.UUID,
        references: {
          model: 'Admins',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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
    await queryInterface.dropTable('Categories');
  },
};
