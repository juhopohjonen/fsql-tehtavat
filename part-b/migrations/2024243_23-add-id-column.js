const { DataTypes } = require('sequelize')

const migration = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.addColumn('user_readinglists', 'id', {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        
        })
    },

    down: async ({ context: queryInterface }) => {
        await queryInterface.removeColumn('user_readinglists', 'id')
    }
}

module.exports = {...migration}