const { DataTypes } = require("sequelize")

const migration = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.addColumn('readinglists', 'id', {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        })
    },

    down: async ({ context: queryInterface }) => {
        await queryInterface.removeColumn('readinglists', 'id')
    }
}

module.exports = {...migration}