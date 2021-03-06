module.exports = function(sequelize, DataTypes) {
  var Brewery = sequelize.define(
    "Brewery",
    {
      brewery_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      neighborhood: {
        type: DataTypes.STRING,
        allowNull: false
      },
      year_est: {
        type: DataTypes.INTEGER,
        $lte: 9999,
        allowNull: false
      },
      desc: {
        type: DataTypes.STRING
      },
      website: {
        type: DataTypes.STRING
      },
      street: {
        type: DataTypes.STRING,
        allowNull: false
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false
      },
      zip: {
        type: DataTypes.INTEGER
      }
    },
    {
      timestamps: false
    }
  );
  Brewery.associate = function(models) {
    // Associating Breweries with Beers
    // If a Brewery is deleted, also delete any associated Beers
    Brewery.hasMany(models.Beer, {
      onDelete: "cascade"
    });
  };

  return Brewery;
};
