const { DataTypes } = require('sequelize')

const migration = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('user_readinglists', {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'Users', key: 'id' }
            },

            readinglist_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'readinglists',
                    key: 'id'
                }
            }
        })
    },

    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('user_readinglists')
    }
}

module.exports = {...migration}