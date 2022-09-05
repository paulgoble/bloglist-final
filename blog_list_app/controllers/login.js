const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  
  const user = await User.findOne({ username })
  if (!user) {
    return res.status(404)
      .json({ error: 'Username not found' })
  }

  const matched = await bcrypt.compare(password, user.passwordHash)
  if (!matched) {
    return res.status(401)
      .json({ error: 'Invalid username or password' })
  }

  const tokenUser = {
    username: user.username,
    id: user._id
  }
  const token = jwt.sign(tokenUser, process.env.SECRET)

  res.status(200).send({
    token, 
    username: user.username,
    name: user.name
  })
})

module.exports = loginRouter