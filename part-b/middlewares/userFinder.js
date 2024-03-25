const User = require("../models/User")

const userFinder = async (req, res, next) => {
    const user = await User.findOne({ where: { username: req.params.username } })

    if (!user) {
        return res.status(404).end()
    }

    req.userFound = user

    next()
}

module.exports = userFinder