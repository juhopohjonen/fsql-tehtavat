const { Op } = require('sequelize')
const userFinder = require('../middlewares/userFinder')
const { Blog, ReadingList } = require('../models')
const ReadStatus = require('../models/ReadStatus')
const User = require('../models/User')

const userRouter = require('express').Router()

userRouter.get('/', async (req, res) => {
    const users = await User.findAll({ include: {
        model: Blog
    } })

    return res.json(users)
})

userRouter.post('/', async (req, res, next) => {
    const { name, username } = req.body

    if (!name || !username) {
        return res.status(400).end()
    }
    
    try {
        const user = new User({
            name,
            username
        })
    
        await user.save()
        return res.json(user)

    } catch (e) {
        if (e.name === 'SequelizeValidationError') {
            return res.status(400).send({ err: 'Incorrect field(s)' })
        }

        console.error('uncaught error', e)

        return res.status(500).end()
    }



})

userRouter.put('/:username', userFinder, async (req, res) => {
    const { userFound } = req

    userFound.name = req.body.name
    await userFound.save()

    return res.json(userFound)
})


userRouter.get('/:username', async (req, res) => {
    const { username } = req.params
    let read = {
        [Op.in]: [true, false]
    }

    if (req.query.read) {
        read = (req.query.read === "true")
    }

    console.log('query', req.params.username, 'read', read)


    const user = await User.findOne({
        where: {
            username: username
        },

        include: [
            {
                model: ReadingList,
                through: {
                    attributes: []
                },
                include: [
                    {
                        model: Blog
                    },
                    {
                        model: ReadStatus,
                        where: {
                            read
                        },
                    },
                ],
            },
            {
                model: Blog
            },
        ]
    })

    console.log(user)

    if (!user) {
        return res.status(400).end()
    }

    return res.json(user)
})
 

module.exports = userRouter