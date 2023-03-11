'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Projects', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      project: {
        type: Sequelize.STRING
      },
      date_commissioned: {
        type: Sequelize.DATE
      },
      detail: {
        type: Sequelize.STRING(20000)
      },
      image: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      isProject: {
        type: Sequelize.ENUM,
        values: ['active', 'pending'],
        defaultValue: 'active'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Projects');
  }
};