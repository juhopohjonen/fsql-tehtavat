const { Op } = require('sequelize')
const blogFinder = require('../middlewares/blogFinder')
const requireAuth = require('../middlewares/requireAuth')
const { Blog } = require('../models')

const blogRouter = require('express').Router()

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.findAll({
        where: {
            [Op.or]: [
            {
                author: {
                    [Op.substring]: req.query.search ? req.query.search : ''
                }
            },
            {
                title: {
                    [Op.substring]: req.query.search ? req.query.search : ''
                }
            }]
        },
        order: [
            ['likes', 'desc']
        ]
    })

    return res.json(blogs)
})

blogRouter.get('/:id', blogFinder, async (req, res) => {
    return res.json(req.blog)
})

blogRouter.post('/', requireAuth, async (req, res, next) => {
    try {
        const { url, title, year } = req.body
        const { username } = req.decodedToken
    
        // make sure that all fields are defined
        
        if (!url || !title | !year) {
            return res.status(400).end()
        }
    
        const blog = new Blog({
            author: username,
            url,
            title,
            UserId: req.user.id,
            year
        })
    
        await blog.save()
    
        return res.json(blog)
    } catch (e) {
        next(e)
    }


})

blogRouter.delete('/:id', requireAuth, blogFinder, async (req, res) => {

    const { username } = req.decodedToken

    const { blog } = req

    if (blog.author !== username) {
        return res.status(403).end()
    }

    await blog.destroy()

    return res.status(204).end()
})

blogRouter.put('/:id', blogFinder, async (req, res) => {
    const { blog } = req
    blog.likes = req.body.likes

    await blog.save()

    return res.json(blog)
})

module.exports = blogRouter