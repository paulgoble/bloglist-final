import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import BlogForm from './BlogForm'

describe('BlogForm', () => {
  test('form calls the event handler received as props when a new blog is created', async () => {
    const mockHandler = jest.fn()

    let container
    container = render(<BlogForm submitBlog={mockHandler} />).container

    const user = userEvent.setup()
    const button = screen.getByText('Add a New Blog')
    await user.click(button)

    const form = container.querySelector('#blog-form')
    fireEvent.submit(form)
    expect(mockHandler).toHaveBeenCalled()
  })
})
