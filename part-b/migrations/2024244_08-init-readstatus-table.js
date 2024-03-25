const { DataTypes } = require('sequelize')

const migration = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('readstatus', {
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
        })

        await queryInterface.addColumn('readinglists', 'readstatus_id', {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'readstatus', key: 'id' }
        })
    },

    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('readstatus')
        await queryInterface.removeColumn('readinglists', 'readstatus_id')
    }

}

module.exports = {...migration}