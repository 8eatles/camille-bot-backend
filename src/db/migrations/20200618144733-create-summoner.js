'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Summoners', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      riotId: {
        type: Sequelize.STRING(64),
      },
      accountId: {
        type: Sequelize.STRING(64),
      },
      encryptedAccountId: {
        type: Sequelize.STRING(64),
      },
      puuid: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING(32),
      },
      searchName: {
        type: Sequelize.STRING(32),
      },
      rankTier: {
        type: Sequelize.STRING(16),
      },
      rankWin: {
        type: Sequelize.INTEGER,
      },
      rankLose: {
        type: Sequelize.INTEGER,
      },
      profileIconId: {
        type: Sequelize.INTEGER,
      },
      revisionDate: {
        type: Sequelize.DATE,
      },
      summonerLevel: {
        type: Sequelize.INTEGER,
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Summoners');
  },
};
