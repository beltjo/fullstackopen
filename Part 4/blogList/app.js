const middleware = require('./utils/middleware')
const express = require('express')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogRouter')
const userRouter = require('./controllers/userRouter')
const config = require('./utils/config')

const app = express()

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { family: 4 })

app.use(express.json())
app.use(middleware.requestLogger)


app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app