import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

const BlogForm = ({ submitBlog }) => {
  const [formHidden, setFormHidden] = useState(true)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const cancelForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
    toggleForm()
  }

  const handleSubmit = (blog) => {
    submitBlog(blog)
    setTitle('')
    setAuthor('')
    setUrl('')
    toggleForm()
  }

  const toggleForm = () => {
    setFormHidden(!formHidden)
  }

  if (formHidden) {
    return (
      <Button id="add-blog-button" onClick={toggleForm}>
        Add a New Blog
      </Button>
    )
  }

  return (
    <div className="mt-4">
      <h2>add a new blog</h2>
      <Form
        id="blog-form"
        onSubmit={() => handleSubmit({ title, author, url })}
      >
        <Form.Group>
          <Form.Label className="mt-2">title:</Form.Label>
          <Form.Control
            type="text"
            value={title}
            name="title"
            id="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="mt-2">author:</Form.Label>
          <Form.Control
            type="text"
            value={author}
            name="author"
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="mt-2">url:</Form.Label>
          <Form.Control
            type="text"
            value={url}
            name="url"
            id="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </Form.Group>
        <Button className="mt-3 me-2" type="submit">
          add blog
        </Button>
        <Button className="mt-3" variant="danger" onClick={cancelForm}>cancel</Button>
      </Form>
    </div>
  )
}

BlogForm.propTypes = {
  submitBlog: PropTypes.func.isRequired,
}

export default BlogForm
