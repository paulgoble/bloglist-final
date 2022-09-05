const config = require('./utils/config')
const express = require('express')
const app = express()

require('express-async-errors')

const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')

const { tokenExtractor } = require('./utils/auth_helper')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')

const mongoUri = config.MONGODB_URI

mongoose.connect(mongoUri)

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use(tokenExtractor)
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)

if (process.env.NODE_ENV === 'test') {
  const testRouter = require('./controllers/test')
  app.use('/api/test', testRouter)
}

module.exports = app