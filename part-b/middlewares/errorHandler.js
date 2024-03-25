const handleError = (err, req, res, next) => {
    console.log(err.errors)


    if (err.name === 'SequelizeValidationError') {

        if (err.errors && err.errors.length > 0 && err.errors[0].message) {
            return res.status(400).send({ err: err.errors[0].message })
        }

        console.log(err)
        return res.status(400).end()
    }

    next(err)
}

module.exports = handleError