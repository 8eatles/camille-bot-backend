'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      imageId: { type: DataTypes.INTEGER },
      username: { type: DataTypes.STRING(32), allowNull: false, unique: true },
      hash: { type: DataTypes.STRING(255), allowNull: false },
      salt: { type: DataTypes.STRING(32), allowNull: false },
      email: { type: DataTypes.STRING(64) },
      givenName: { type: DataTypes.STRING(32) },
      familyName: { type: DataTypes.STRING(32) },
      phone: { type: DataTypes.STRING(32) },
      verify: { type: DataTypes.BOOLEAN, defaultValue: false },
      accessToken: { type: DataTypes.STRING(255) },
      refreshToken: { type: DataTypes.STRING(255) },
      lastLoggedAt: { type: DataTypes.DATE },
    },
    {},
  );
  User.associate = function (models) {
    User.hasMany(models.Summoner, {
      as: 'summoners',
      sourceKey: 'id',
    });
    User.belongsToMany(models.Group, {
      as: 'groups',
      through: 'RelationUserGroup',
      foreignKey: 'userId',
    });
  };
  return User;
};
