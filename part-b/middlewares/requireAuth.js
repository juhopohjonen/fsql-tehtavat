const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../util/config')
const { User, Session } = require('../models/index')

const requireAuth = async (req, res, next) => {
    const auth = req.get('authorization')
    
    if (!auth || !auth.startsWith('Bearer ')) {
        return res.status(400).send({
            err: 'invalid token?'
        })
    }

    try {
        const headerStrings = auth.split(' ')
        const token = headerStrings[1]
        const decoded = jwt.verify(token, JWT_SECRET)
        req.decodedToken = decoded

        const username = decoded.username

        // verify that token exists in sessions table

        const session = await Session.findOne({
            where: {
                token: token
            }
        })
    
        if (!session) {
            return res.status(401).send({
                err: 'Token expired'
            })
        }

        req.sessionId = session.id

        const user = await User.findOne({ where: { username } })
        req.user = user
    } catch (e) {
        console.error('err in token parsing', e)
        return res.status(400).send({ msg: 'malformed token?' })
    }


    next()
}

module.exports = requireAuth