'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable('roles', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      cargo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      }
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable('roles');
  }
};
