const express = require('express')
const app = express()

const { PORT } = require('./util/config')
const blogRouter = require('./controllers/blogRouter')
const { connectToDb } = require('./util/db')
const userRouter = require('./controllers/userRouter')
const loginRouter = require('./controllers/loginRouter')
const authorRouter = require('./controllers/authorRouter')
const handleError = require('./middlewares/errorHandler')
const readingListRouter = require('./controllers/readingListRouter')
const logoutRouter = require('./controllers/logoutRouter')

app.use(express.json())

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/logout', logoutRouter)
app.use('/api/authors', authorRouter)
app.use('/api/readinglists', readingListRouter)

app.use(handleError)

const start = async () => {
    await connectToDb()
    app.listen(PORT, () => {
        console.log('Server running on', PORT)
    })
}

start()