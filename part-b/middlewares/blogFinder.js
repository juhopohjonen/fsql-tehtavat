const { Blog, User } = require("../models")

const blogFinder = async (req, res, next) => {
    const blog = await Blog.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: User
        }
    })

    if (!blog) {
        return res.status(404).end()
    }

    req.blog = blog
    
    next()
}

module.exports = blogFinder