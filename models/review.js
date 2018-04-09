module.exports = function(sequelize, DataTypes) {
    var Review = sequelize.define("Review", {
        title: {
            type: DataTypes.STRING
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });
    Review.associate = function(models) {
        Reivew.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    }
    return Review;
}