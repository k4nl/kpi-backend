'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      matricula: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      data_de_admissao: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      data_de_rescisao: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      cargo: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'cargo',
        },
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
    )
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable('users');
  }
};
