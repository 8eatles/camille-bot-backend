'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    encoding: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    mimetype: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    filename: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
  }, {});
  Image.associate = function(models) {
    // associations can be defined here
  };
  return Image;
};