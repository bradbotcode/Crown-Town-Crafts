module.exports = function(sequelize, DataTypes) {
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
      allowNull: false
    },
    style: {
      type: DataTypes.STRING,
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

  Beer.associate = function(models) {
    Beer.belongsTo(models.Brewery, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Beer;
};
