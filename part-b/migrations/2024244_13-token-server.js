const { DataTypes } = require('sequelize')

const migrations = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.addColumn("Users", 'disabled', {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            required: true
        })

        await queryInterface.createTable("sessions", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            token: {
                type: DataTypes.STRING,
                allowNull: false
            }
        })
    },

    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('sessions')
        await queryInterface.removeTable('Users', 'disabled')
    }
}

module.exports = {...migrations}