const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../util/db");

class ReadingList extends Model {}

ReadingList.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' }
    },

    blogId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'blogs', key: 'id' }
    },

    readstatusId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'readstatus',
            key: 'id'
        },
    }
}, {
    sequelize: sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'readinglists'
})

module.exports = ReadingList