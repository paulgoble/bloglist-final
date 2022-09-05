const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require ('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const { userList, blogsList, newBlog } = require('./blogs_test_helpers')


const testUser = {
  username: "User",
  password: "abcd123"
};
let token;

beforeAll(async () => {
  await User.deleteMany({})
  for (let user of userList) {
    let newUser = new User(user)
    await newUser.save()
  }
  await api.post('/api/users').send(testUser)

  const response = await api.post('/api/login').send(testUser)
  token = response.body.token
})

beforeEach(async () => {
  await Blog.deleteMany({})
  for (let blog of blogsList) {
    let blogPost = new Blog(blog)
    
    await blogPost.save()
  }
})


describe('GET', () => {
  test('returns the correct number of blogs', async() => {
    const response = await api.get('/api/blogs')
      
    expect(response.body).toHaveLength(blogsList.length)
  })

  test("verifies that the unique id property is named 'id'", async() => {
    const response = await api.get('/api/blogs')
    
    expect(response.body[0].id).toBeDefined();
  })
})


describe('DELETE', () => {
  test('removes a blog post using unique id', async() => {
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', 'bearer ' + token)
    
    await api
      .delete(`/api/blogs/${response.body.id}`)
      .set('Authorization', 'bearer ' + token)
      .expect(204)

    const blogsAfter = await api.get('/api/blogs')
    expect(blogsAfter.body).toHaveLength(blogsList.length)
  })
})


describe('POST', () => {
  test('adds a new blog to the database', async() => {
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', 'bearer ' + token)
    expect(response.body).toMatchObject(newBlog)

    const blogsAfter = await api.get('/api/blogs')
    expect(blogsAfter.body).toHaveLength(blogsList.length + 1)
  })

  test('if likes is missing from post then default to 0', async() => {
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', 'bearer ' + token)
    expect(response.body).toHaveProperty('likes', 0)
  })

  test('if unauthorized request return status 401', async() => {
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })

  test('if title and url are missing return status 400', async() => {
    newBlog.title = null;
    newBlog.url = null;

    await api
      .post('/api/blogs')
      .send(newBlog).set('Authorization', 'bearer ' + token)
      .expect(400)
  })
})


describe('PUT', () => {
  test('updates likes correctly', async() => {
    const response = await api.get('/api/blogs')
    
    response.body[0].likes += 1;
    const updatedBlog = new Blog(response.body[0])
    
    await api
      .put(`/api/blogs/${updatedBlog.id}`)
      .send(updatedBlog).set('Authorization', 'bearer ' + token)
      .expect(200)

    const blogsAfter = await api.get('/api/blogs')
    expect(blogsAfter.body[0].likes).toEqual(updatedBlog.likes)
  })
})


afterAll(() => {
  mongoose.connection.close()
})