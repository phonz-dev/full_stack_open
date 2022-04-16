const express = require('express')
require('express-async-errors')
const app = express()
const middleware = require('./utils/middleware')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const mongoUrl = config.MONGODB_URI

logger.info('connecting to', mongoUrl)

mongoose.connect(mongoUrl)
	.then(() => {
		logger.info('connected to MongoDB')
	})
	.catch(error => {
		logger.error('error connecting to MongoDB', error.message)
	})

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.errorHandler)

module.exports = app