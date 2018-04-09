module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        user_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        uid: {
            type: DataTypes.STRING,
            allowNull: false
        },
        total_cheers: {
            type: DataTypes.INTERGER,
            defaultValue: 0,
            allowNull: false
        },
        total_reviews: {
            type: DataTypes.INTERGER
        }
    });
    return User;
}