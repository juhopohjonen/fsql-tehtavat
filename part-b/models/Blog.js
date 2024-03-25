const { Model, DataTypes } = require("sequelize");
const { sequelize } = require('../util/db')

class Blog extends Model {}

Blog.init({
    author: {
        type: DataTypes.STRING,
    },

    url: {
        type: DataTypes.STRING,
        allowNull: false
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },

    year: {
        type: DataTypes.INTEGER,
        validate: {
            isValidYear(value) {
                if (value < 1991 || value > new Date().getFullYear()) {
                    throw new Error('Year is not valid.')
                }
            }
        }
    }
}, {
    sequelize,
    tableName: "blogs"
})

module.exports = Blog