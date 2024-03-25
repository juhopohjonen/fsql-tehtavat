require('dotenv').config()

const environment = {
    DB_URI: process.env.DB_URI,
    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET
}

module.exports = {...environment}