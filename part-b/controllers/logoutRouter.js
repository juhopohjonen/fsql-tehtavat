const requireAuth = require('../middlewares/requireAuth')
const { Session } = require('../models')

const logoutRouter = require('express').Router()

logoutRouter.post('/', requireAuth, async (req, res) => {
    const session = await Session.findByPk(req.sessionId)

    if (!session) {
        return res.status(409).end()
    }

    await session.destroy()

    return res.status(204).end()
})

module.exports = logoutRouter