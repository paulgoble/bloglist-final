import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

describe('Blog', () => {
  const mockBlog = {
    title: 'test blog',
    author: 'test author',
    url: 'test URL',
    likes: 0,
    user: {
      name: 'test user',
    },
  }
  const mockHandler = jest.fn()

  let container

  beforeEach(() => {
    container = render(
      <Blog
        blog={mockBlog}
        username={mockBlog.user.name}
        updateBlogLikes={mockHandler}
        removeBlog={mockHandler}
      />
    ).container
  })

  test('renders Blog component', () => {
    const element = screen.getByText('test blog')
    expect(element).toBeDefined()
  })

  test('blog details are not rendered by default', () => {
    const div = container.querySelector('.blogDetails')
    expect(div).not.toBeInTheDocument()
  })

  test('blog details are rendered after the button has been clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.blog-details')
    expect(div).toBeDefined()
  })

  test('event handler called twice if like button is pressed twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const like = screen.getByText('like')
    await user.dblClick(like)

    expect(mockHandler).toHaveBeenCalledTimes(2)
  })
})
