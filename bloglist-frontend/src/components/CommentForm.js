import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const CommentForm = ({ submitComment }) => {
  const [comment, setComment] = useState('')

  const handleSubmit = (comment) => {
    submitComment(comment)
    setComment('')
  }

  return (
    <div>
      <Form.Label className="mt-2">Leave a comment:</Form.Label>
      <Form.Control
        type="text"
        value={comment}
        name="comment"
        id="comment"
        onChange={({ target }) => setComment(target.value)}
      />
      <Button className="mt-3" onClick={() => handleSubmit(comment)}>submit</Button>
    </div>
  )
}

export default CommentForm