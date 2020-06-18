'use strict';
module.exports = (sequelize, DataTypes) => {
  const Participant = sequelize.define(
    'Participant',
    {
      accountId: {
        type: DataTypes.STRING(64),
      },
      name: {
        type: DataTypes.STRING(32),
      },
    },
    {},
  );
  Participant.associate = function (models) {
    Participant.belongsTo(models.Summoner, {
      as: 'summoner',
      foreignKey: 'accountId',
    });
    Participant.belongsToMany(models.Match, {
      as: 'team1',
      through: 'RelationParticipantMatchTeam1',
      foreignKey: 'participantId',
    });
    Participant.belongsToMany(models.Match, {
      as: 'team2',
      through: 'RelationParticipantMatchTeam2',
      foreignKey: 'participantId',
    });
  };
  return Participant;
};
