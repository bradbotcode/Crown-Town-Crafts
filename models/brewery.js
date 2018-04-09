module.exports = function(sequelize, DataTypes) {
    var Brewery = sequelize.define("Brewery", {
        brewery_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        neighborhood: {
            type: DataTypes.STRING,
            allowNull: false
        },
        year_est: {
            type: DataTypes.INTERGER,
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
        zip: {
            type: DataTypes.INTERGER
        }

    });
    return Brewery;
}