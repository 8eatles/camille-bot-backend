'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      imageId: { type: Sequelize.INTEGER },
      username: { type: Sequelize.STRING(32), allowNull: false, unique: true },
      hash: { type: Sequelize.STRING(255), allowNull: false },
      salt: { type: Sequelize.STRING(32), allowNull: false },
      email: { type: Sequelize.STRING(64) },
      givenName: { type: Sequelize.STRING(32) },
      familyName: { type: Sequelize.STRING(32) },
      phone: { type: Sequelize.STRING(32) },
      verify: { type: Sequelize.BOOLEAN, defaultValue: false },
      accessToken: { type: Sequelize.STRING(255) },
      refreshToken: { type: Sequelize.STRING(255) },
      lastLoggedAt: { type: Sequelize.DATE },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  },
};
