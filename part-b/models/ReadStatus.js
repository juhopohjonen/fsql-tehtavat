const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../util/db");

class ReadStatus extends Model {}

ReadStatus.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
},
{
    sequelize: sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'readstatus',
    freezeTableName: true
})

module.exports = ReadStatus