'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define(
    'Group',
    {
      name: { type: DataTypes.STRING(32), allowNull: false },
    },
    {},
  );
  Group.associate = function (models) {
    Group.belongsToMany(models.User, {
      as: 'users',
      through: 'RelationUserGroup',
      foreignKey: 'groupId',
    });

    Group.hasMany(models.Match, {
      as: 'matches',
      sourceKey: 'id',
    });
  };
  return Group;
};
