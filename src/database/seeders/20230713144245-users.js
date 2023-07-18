'use strict';

/** @type {import('sequelize-cli').Migration} */
const getInitialData = require('../initialData')
const moment = require('moment');

module.exports = {
  async up (queryInterface, Sequelize) {
    const initialData = await getInitialData('data.csv');
    const initialUsers = initialData.map((user) => ({
      matricula: Number(user.matricula),
      status: user.status === 'ativo' ? true : false,
      nome: user.nome,
      email: user.email,
      data_de_admissao: moment(user.data_de_admissao, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      data_de_rescisao: user.data_de_rescisao ? moment(user.data_de_rescisao, 'DD/MM/YYYY').format('YYYY-MM-DD') : null,
      cargo: user.cargo.toLowerCase(),
    }));
    queryInterface.bulkInsert('users', initialUsers);
  },

  async down (queryInterface, Sequelize) {
    queryInterface.bulkDelete('users', null, {});
  }
};
