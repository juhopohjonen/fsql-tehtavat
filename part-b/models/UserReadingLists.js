const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../util/db");

class UserReadingLists extends Model {}

UserReadingLists.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    readinglistId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},
{
    sequelize: sequelize,
    modelName: 'user_readinglists',
    timestamps: false,
    underscored: true
})

module.exports = UserReadingLists