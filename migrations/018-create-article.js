'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Articles', {
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      articleCategoryId: {
        type: Sequelize.UUID,
        references: {
          model: 'ArticleCategories',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING(255),
      },
      viewers: {
        type: Sequelize.FLOAT,
      },
      likes: {
        type: Sequelize.FLOAT,
      },
      share: {
        type: Sequelize.FLOAT,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      isPublish: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      publishedAt: {
        type: Sequelize.DATE,
      },
      unpublishedAt: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('Articles');
  },
};
