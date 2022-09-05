const mongoose = require('mongoose')

mongoose.set('toJSON', { virtuals: true })

const blogSchema = new mongoose.Schema({
  url: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String },
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true 
  },
  likes: { type: Number },
  comments: [
    { type: String }
  ]
})

blogSchema.set('toJson', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)