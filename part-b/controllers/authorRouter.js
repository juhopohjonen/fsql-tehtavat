const { Blog } = require('../models')
const { fn, col } = require('sequelize')

const authorRouter = require('express').Router()

authorRouter.get('/', async (req, res) => {
    const blogs = await Blog.findAll({
        attributes: [
            [fn('COUNT', "UserId"), 'blogs'],
            [fn('SUM', col("likes")), 'likes'],
            'author'
        ],

        group: 'author'
    })

    return res.json(blogs)
})

module.exports = authorRouter