'use strict';
module.exports = (sequelize, DataTypes) => {
  const Summoner = sequelize.define(
    'Summoner',
    {
      userId: {
        type: DataTypes.INTEGER,
      },
      riotId: {
        type: DataTypes.STRING(64),
      },
      accountId: {
        type: DataTypes.STRING(64),
      },
      encryptedAccountId: {
        type: DataTypes.STRING(64),
      },
      puuid: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING(32),
      },
      searchName: {
        type: DataTypes.STRING(32),
      },
      rankTier: {
        type: DataTypes.STRING(16),
      },
      rankWin: {
        type: DataTypes.INTEGER,
      },
      rankLose: {
        type: DataTypes.INTEGER,
      },
      profileIconId: {
        type: DataTypes.INTEGER,
      },
      revisionDate: {
        type: DataTypes.DATE,
      },
      summonerLevel: {
        type: DataTypes.INTEGER,
      },
    },
    {},
  );
  Summoner.associate = function (models) {
    Summoner.belongsTo(models.User, {
      as: 'user',
      forignKey: 'userId',
    });
    Summoner.hasOne(models.Participant, {
      as: 'participant',
      sourceKey: 'accountId',
    });
  };
  return Summoner;
};
