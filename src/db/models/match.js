'use strict';
module.exports = (sequelize, DataTypes) => {
  const Match = sequelize.define(
    'Match',
    {
      gameId: {
        type: DataTypes.BIGINT,
      },
      groupId: {
        type: DataTypes.INTEGER,
      },
      winTeam: {
        type: DataTypes.TINYINT,
      },
      gameCreation: {
        type: DataTypes.DATE,
      },
    },
    {},
  );
  Match.associate = function (models) {
    Match.belongsToMany(models.Participant, {
      as: 'team1',
      through: 'RelationParticipantMatchTeam1',
      foreignKey: 'matchId',
    });
    Match.belongsToMany(models.Participant, {
      as: 'team2',
      through: 'RelationParticipantMatchTeam2',
      foreignKey: 'matchId',
    });
  };
  return Match;
};
