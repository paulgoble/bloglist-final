const jwt = require('jsonwebtoken')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7)
  }
  next()
}

const userExtractor = (req, res, next) => {
  if (!req.token) {
    return res.status(401).json({ error: 'user not authorized' })
  }

  const verifiedToken = jwt.verify(req.token, process.env.SECRET)
  if (!verifiedToken.id) {
    return res.status(401).json({ error: 'invalid token' })
  }
  req.userId = verifiedToken.id
  next()
}

module.exports = { tokenExtractor, userExtractor }