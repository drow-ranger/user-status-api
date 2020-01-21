'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Role, {
      through: 'user_roles',
      foreignKey: 'userId',
      otherKey: 'roleId'
    });

    User.hasMany(models.Status, {
      foreignKey: 'user_id',
      as: 'statuses',
    });
  };
  return User;
};