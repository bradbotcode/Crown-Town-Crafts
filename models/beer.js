module.exports = function (sequelize, DataTypes) {
  var Beer = sequelize.define("Beer", {

    beer_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    abv: {
      type: DataTypes.STRING,
    },
    ibu: {
      type: DataTypes.STRING
    },
    style: {
      type: DataTypes.STRING,
      allowNull: false
    },
    simple_style: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cheers: {
      type: DataTypes.STRING,
      defaultValue: 0
    },
    rating: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    hood: {
      type: DataTypes.STRING,
    }
  }, {
    timestamps: false
  });

  Beer.associate = function (models) {
    Beer.belongsTo(models.Brewery, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Beer;
};