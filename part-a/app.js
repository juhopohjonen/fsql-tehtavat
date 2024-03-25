const { Sequelize, Model, DataTypes } = require('sequelize')

require('dotenv').config()

const { DB_URI } = process.env

const sequelize = new Sequelize(DB_URI)

class Blog extends Model {}

Blog.init({
    author: {
        type: DataTypes.STRING,
    },

    url: {
        type: DataTypes.STRING,
        allowNull: false
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    tableName: "blogs"
})

Blog.sync()

const express = require('express')

const app = express()
app.use(express.json())

app.get('/api/blogs/:id', async (req, res) => {
    const { id } = req.params

    const blog = await Blog.findByPk(id)

    if (blog) {
        return res.json(blog)
    } else {
        return res.status(404).end()
    }
})

app.post('/api/blogs', async (req, res) => {
    const { author, url, title } = req.body

    // make sure that all fields are defined
    if (!author || !url || !title) {
        return res.status(400).end()
    }

    const blog = new Blog({
        author,
        url,
        title
    })

    await blog.save()

    return res.json(blog)
})

app.delete('/api/blogs/:id', async (req, res) => {
    const { id } = req.params

    const blog = await Blog.findByPk(id)

    if (blog) {
        blog.destroy();
        return res.status(204).end()
    } else {
        return res.send(400).end()
    }
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})