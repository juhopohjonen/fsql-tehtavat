const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class User extends Model {}

User.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'isEmailError'
            }
        }
    },

    disabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
},
{
    sequelize,
    modelName: 'Users'
})


module.exports = User