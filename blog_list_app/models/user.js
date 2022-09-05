const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String },
  passwordHash: { type: String, required: true },
  blogs: [
    { type: String }
  ]
})

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
    delete ret.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)