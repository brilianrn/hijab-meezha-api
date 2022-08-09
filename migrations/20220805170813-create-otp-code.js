'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OtpCodes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      token: {
        type: Sequelize.STRING(6),
        allowNull: false,
        unique: true,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      expired_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
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
    await queryInterface.dropTable('OtpCodes');
  },
};
