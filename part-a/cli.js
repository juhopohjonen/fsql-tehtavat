const { Sequelize, QueryTypes } = require('sequelize')

require('dotenv').config()

const DB_URI = process.env.DB_URI
const sequelize = new Sequelize(DB_URI)

const connectAndFetchBlogs = async () => {
    try {
        await sequelize.authenticate()
        const blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
        blogs.forEach(blog => {
            console.log(blog.author, "'s", blog.title, 'has', blog.likes, 'likes.')
        })
        sequelize.close()
    } catch (e) {
        console.error('Error in db connection: ', e)
    }
    
}

connectAndFetchBlogs()