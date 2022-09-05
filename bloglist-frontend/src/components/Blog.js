import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { setBlogs } from '../reducers/blogsReducer'
import { Button, Badge, ListGroup } from 'react-bootstrap'
import blogService from '../services/blogs'
import CommentForm from './CommentForm'

const Blog = ({ notify }) => {
  const username = useSelector(state => state.user.name)
  const blogs = useSelector(state => state.blogs)
  const id = useParams().id
  const blog = blogs.bloglist.find(b => b.id === id)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (blogs.bloglist.length === 0) {
      blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)))
    }
  }, [])

  const updateBlogLikes = async (blog) => {
    try {
      const update = {
        id: blog.id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
      }
      await blogService.updateBlog(update)
      dispatch(setBlogs(await blogService.getAll()))
    } catch (error) {
      notify('error: missing or invalid credentials', 5)
    }
  }

  const submitComment = async (comment) => {
    try {
      await blogService.addComment(blog, comment)
      dispatch(setBlogs(await blogService.getAll()))
    } catch (error) {
      notify('server error: unable to add comment')
    }
  }

  const removeBlog = async (blog) => {
    if (
      window.confirm(
        'Warning: blog will be deleted permanently. Are you sure you wish to continue?'
      )
    ) {
      try {
        await blogService.deleteBlog(blog)
        navigate(`/users/${username}`)
      } catch (error) {
        notify('error: missing or invalid credentials', 5)
      }
    }
  }

  const showRemoveButton = () => (
    <div>
      <Button className="mt-3" data-cy="remove-button"
        onClick={() => removeBlog(blog)}>remove blog
      </Button>
    </div>
  )

  if (!blog) {
    return null
  }

  return (
    <div className="mt-4">
      <h2><em>{blog.title}</em> by {blog.author}</h2>
      <ListGroup>
        <ListGroup.Item><b>{blog.url}</b></ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between align-items-start">
          <div>Likes:<Badge className="mx-2">{blog.likes}</Badge></div>
          <Button size="sm" data-cy="like-button"
            onClick={() => updateBlogLikes(blog)}>like
          </Button>
        </ListGroup.Item>
      </ListGroup>
      {username !== blog.user.name ? null : showRemoveButton()}
      <h3 className="mt-4">comments:</h3>
      <ListGroup>{blog.comments.map(comment => (
        <ListGroup.Item key={comment}>{comment}</ListGroup.Item>
      ))}</ListGroup>
      <CommentForm submitComment={submitComment}/>
    </div>
  )
}

export default Blog
