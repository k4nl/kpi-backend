'use strict';

/** @type {import('sequelize-cli').Migration} */
const getInitialData = require('../initialData')

/*

initial
{
    matricula: '99',
    status: 'ativo',
    nome: 'Michael Goodwin',
    email: 'michaelgoodwin@kpis.tech',
    email_gestor: 'shanebonillajr.@kpis.tech',
    data_de_admissao: '07/04/2021',
    data_de_rescisao: '',
    cargo: 'Analista'
  }

db
{
  id: 1,
  email: michaelgoodwin@kpis.tech
}

*/

const getUserAndManager = (initialData, databaseUsers) => {
  let userId = null;
  let managerId = null;
  for (let i = 0; i < databaseUsers.length; i++) {
    if (userId && managerId) break;
    const dbUser = databaseUsers[i];
    if (dbUser.email === initialData.email) userId = Number(dbUser.id);
    if (dbUser.email === initialData.email_gestor) managerId = Number(dbUser.id);
  }
  return { userId, managerId };
}

const transformInitialData = (initialData, databaseUsers) => {
  const transformedData = new Array();
  initialData.forEach((item) => {
    const { userId, managerId } = getUserAndManager(item, databaseUsers);
    transformedData.push({ user_id: userId, manager_id: managerId });
  });
  return transformedData;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      const initialData = await getInitialData('data.csv');
      const users = await queryInterface.sequelize.query('SELECT id, email FROM users', { type: queryInterface.sequelize.QueryTypes.SELECT });
      const transformedData = transformInitialData(initialData, users);
      await queryInterface.bulkInsert('users_manager', transformedData);
    } catch (error) {
      console.log(error);
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users_manager', null, {});
  }
};
