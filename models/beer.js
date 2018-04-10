module.exports = function (sequelize, DataTypes) {
  var Beer = sequelize.define("Beer", {

    beer_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    abv: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    ibu: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    style: {
      type: DataTypes.STRING,
      allowNull: false
    },
    brewery_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cheers: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER
    }
  });


  return Beer;
};