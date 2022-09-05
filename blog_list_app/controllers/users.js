const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (req, res) => {
  const users = await User
    .find({}).populate('blogs', { url: 1, title: 1, author: 1 })

  if (users) {
    res.json(users)
  } else {
    res.status(404).end()
  }
})

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  const found = await User.findOne({ username: username })

  if (found) {
    res.status(400).json({ error: 'Username already exists!' })
  } else if (password.length < 3 || username.length < 3) {
    res.status(400).json({ error: 'Both username and password must be at least 3 characters long.' })
  } else {
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()
    res.status(201).json(savedUser)
  }
})

module.exports = usersRouter