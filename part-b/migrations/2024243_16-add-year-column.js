const { DataTypes } = require("sequelize")

const migration = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.addColumn('blogs', 'year', {
            type: DataTypes.INTEGER,
            validate: {
                isValidYear(value) {
                    if (value < 1991 || value > new Date().getFullYear()) {
                        throw new Error('Year is not valid.')
                    }
                }
            }
        })
    },

    down: async ({ context: queryInterface }) => {
        await queryInterface.removeColumn('blogs', 'year')
    }
}

module.exports = migration