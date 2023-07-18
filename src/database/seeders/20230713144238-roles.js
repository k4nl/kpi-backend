'use strict';

/** @type {import('sequelize-cli').Migration} */
const getInitialData = require('../initialData')
module.exports = {
  async up(queryInterface, Sequelize) {
    const roles = new Set([]);
    const data = await getInitialData('data.csv');
    data.forEach((item) => {
      if (roles.has(item.cargo.toLowerCase())) return;
      roles.add(item.cargo.toLowerCase());
    });
    const rolesArray = Array.from(roles);
    await queryInterface.bulkInsert('roles', rolesArray.map((cargo) => ({ cargo })));
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  },
}