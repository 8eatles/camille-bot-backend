'use strict';
module.exports = (sequelize, DataTypes) => {
  const Site = sequelize.define(
    'Site',
    {
      name: {
        type: DataTypes.STRING(32),
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
      },
      salt: { type: DataTypes.STRING(32), allowNull: false },
    },
    {},
  );
  Site.associate = function (models) {
    // associations can be defined here
  };
  return Site;
};
