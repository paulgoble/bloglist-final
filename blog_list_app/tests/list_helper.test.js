const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
})

describe('favorite blog', () => {
  const list = [
    { likes: 0, title: 'an ok blog' },
    { likes: 2, title: 'my favorite blog' }
  ]

  test('when list has two blogs, return the one with the most likes', () => {
    const result = listHelper.favoriteBlog(list);
    expect(result).toBe(list[1])
  })
})

describe('most blogs', () => {
  const list = [
    { author: "Robert C. Martin" },
    { author: "Robert A. Heinlein" },
    { author: "Robert C. Martin" },
    { author: "Robert Smith" }
  ]

  test('return the author with the most blogs', () => {
    const result = listHelper.mostBlogs(list);
    expect(result).toEqual({ author: "Robert C. Martin", blogs: 2 })
  })
})

describe('most likes', () => {
  const posts = [
    { author: "Robert C. Martin", likes: 8 },
    { author: "Robert A. Heinlein", likes: 9 },
    { author: "Robert C. Martin", likes: 5 },
    { author: "Robert A. Heinlein", likes: 2 },
    { author: "Robert Smith", likes: 3 }
  ]

  test('return the author with the most likes', () => {
    const result = listHelper.mostLikes(posts);
    expect(result).toEqual({ author: "Robert A. Heinlein", likes: 11 })
  })
})