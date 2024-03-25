const { DataTypes } = require('sequelize')

const migration = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('readinglists', {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'Users', key: 'id' }
            },

            blog_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'blogs',
                    key: 'id'
                }
            }
        })
    },

    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('readinglists')
    }
}

module.exports = {...migration}