const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const app = require ('../app')

const api = supertest(app)

const { userList, invalidUserList } = require('./blogs_test_helpers')

beforeEach(async () => {
  await User.deleteMany({})
  for (let user of userList) {
    let newUser = new User(user)
    await newUser.save()
  }
})

describe('POST a new User with invalid username or password', () => {
  test('checks that invalid users are not created', async() => {
    for (let invalidUser of invalidUserList) {
      await api.post('/api/users').send(invalidUser).expect(400)
      
      const usersAfter = await api.get('/api/users')
      expect(usersAfter.body).toHaveLength(userList.length)
    }
  })
})

afterAll(() => {
  mongoose.connection.close()
})