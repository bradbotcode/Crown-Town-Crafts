module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    uid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    total_cheers: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    total_reviews: {
      type: DataTypes.INTEGER
    }
  });
  return User;
};
