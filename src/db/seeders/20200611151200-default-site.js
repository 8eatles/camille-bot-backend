'use strict';
const { v1 } = require('uuid');
const randomstring = require('randomstring');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Sites', [
      {
        name: 'Camille Server',
        salt: randomstring.generate(32),
        uuid: v1(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
