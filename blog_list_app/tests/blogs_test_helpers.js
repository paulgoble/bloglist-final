const mongoose = require('mongoose')

const userList = [
  {
    "username": "User One",
    "name": "Andy",
    "passwordHash": "$2b$10$ZEweNTbFNQKylJaTRS3Ws.F0ZtU/LpWpBAS5XoRM1fNhipuic/s66",
    "blogs": [],
    "_id": mongoose.Types.ObjectId("51bb793aca2ab77a3200000d"),
    "id": mongoose.Types.ObjectId("51bb793aca2ab77a3200000d").toString()
  },
  {
    "username": "User Two",
    "name": "Django",
    "passwordHash": "$2b$10$C0j7l.yT2qUvjfejcXvuPuz3Bb9gXIHzhQR7iFShEUWv0Brz9J80S",
    "blogs": [],
    "_id": mongoose.Types.ObjectId("51bb793aca2ab77a3200000e"),
    "id": mongoose.Types.ObjectId("51bb793aca2ab77a3200000e").toString()
  }
]

const blogsList = [
  {
    "url": "www.waitforit.com",
    "title": "How to Use Async/Await",
    "author": "John Doe",
    "user": userList[0]._id,
    "_id": mongoose.Types.ObjectId("51bb793aca2ab77a32000001"),
    "id": mongoose.Types.ObjectId("51bb793aca2ab77a32000001").toString(),
    "likes": 8
  },
  {
    "url": "www.nowigetit.com",
    "title": "Understanding Mongoose Virtuals",
    "author": "Jane Doe",
    "user": userList[0]._id,
    "_id": mongoose.Types.ObjectId("51bb793aca2ab77a32000002"),
    "id": mongoose.Types.ObjectId("51bb793aca2ab77a32000002").toString(),
    "likes": 4
  },
  {
    "url": "localhost:3000",
    "title": "How to Play the Guitar",
    "author": "Django",
    "user": userList[1]._id,
    "_id": mongoose.Types.ObjectId("51bb793aca2ab77a32000003"),
    "id": mongoose.Types.ObjectId("51bb793aca2ab77a32000003").toString(),
    "likes": 44
  }
]

const newBlog = {
  "url": "www.pro-grammar.com",
  "title": "JavaScript Syntax",
  "author": "Jane Doe"
}

const invalidUserList = [
  {
    "username": "Bo",
    "name": "invalid username",
    "password": "1111"
  },
  {
    "username": "Bobby",
    "name": "invalid password",
    "password": "11"
  },
  {
    "username": "User One",
    "name": "existing username",
    "password": "1111"
  }
]

module.exports = {
  userList,
  invalidUserList,
  blogsList, 
  newBlog
}