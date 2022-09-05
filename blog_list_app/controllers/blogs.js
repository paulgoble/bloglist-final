const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/auth_helper')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  if (blogs) {
    res.json(blogs)
  } else {
    res.status(404).end()
  }
})

blogsRouter.post('/', userExtractor, async (req, res) => {
  const blog = new Blog(req.body)
  if (!blog.url || !blog.title) {
    res.status(400).json({ error: 'new blogs must have a title and url'})
  }
  const user = await User.findById(req.userId)

  blog.likes = blog.likes ? blog.likes : 0
  blog.comments = blog.comments ? blog.comments : []
  blog.user = user
  
  const newBlog = await blog.save()
  user.blogs.push(newBlog._id.toString())
  
  const updatedUser = new User(user)
  const result = await User.findByIdAndUpdate(req.userId, updatedUser)
  if (result) {
    res.status(201).json(newBlog)
  } else {
    res.status(500).end()
  }
})

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  
  if (!blog.user) {
    return res.status(400).json({ error: 'this blog has no user'})
  }
  if (blog.user.toString() !== req.userId) {
    return res.status(403).json({ error: 'access forbidden' })
  }

  const result = await Blog.findByIdAndRemove(req.params.id)
  if (result) {
    res.status(204).end()
  } else {
    res.status(400).end()
  }
})

blogsRouter.put('/:id', userExtractor, async (req, res) => {
  const blog = req.body
  const options = { new: true, runValidators: true }

  const result = await Blog.findByIdAndUpdate(req.params.id, blog, options)
  if (result) {
    res.json(result)
  } else {
    res.status(400).end()
  }
})

blogsRouter.post('/:id/comments', userExtractor, async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  blog.comments.push(req.body.comment)

  const result = await Blog.findByIdAndUpdate(req.params.id, blog)
  if (result) {
    res.json(result)
  } else {
    res.status(500).end()
  }
})

module.exports = blogsRouter