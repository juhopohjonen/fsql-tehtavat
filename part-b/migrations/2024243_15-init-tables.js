const { DataTypes } = require('sequelize')
 
const migration = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('blogs', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
        
            likes: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },

            author: {
                type: DataTypes.STRING,
                allowNull: false
            },

            
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },

            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW   
            }
        }),

        await queryInterface.createTable('Users', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
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

            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },

            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW   
            }
        }),

        await queryInterface.addColumn('blogs', 'UserId', {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        })
    },

    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('blogs')
        await queryInterface.dropTable('Users')
    }
}

module.exports = {...migration}