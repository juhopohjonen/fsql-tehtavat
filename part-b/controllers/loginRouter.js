const User = require('../models/User')

const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../util/config')
const { Session } = require('../models')

loginRouter.post('/', async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).end()
    }

    const user = await User.findOne({ where: { username: username } })
    if (!user) {
        return res.status(404).end()
    }

    if (password !== 'salainen') {
        return res.status(401).end()
    }

    const token = jwt.sign({ username }, JWT_SECRET, {
        expiresIn: '2 days'
    })

    // create session

    const session = new Session({
        token: token
    })

    await session.save()

    return res.send({
        username: user.username,
        name: user.name,
        token
    })     
})

module.exports = loginRouter