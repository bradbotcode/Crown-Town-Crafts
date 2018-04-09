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
      type: DataTypes.INTERGER,
      allowNull: false
    },
    style: {
      type: datatypes.STRING,
      allowNull: false
    },
    cheers: {
      type: datatypes.INTERGER,
      defaultValue: 0,
      allowNull: false
    },
    rating: {
      type: datatypes.INTERGER
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
