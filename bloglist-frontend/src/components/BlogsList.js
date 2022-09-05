import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { setBlogs } from '../reducers/blogsReducer'
import blogService from '../services/blogs'
import BlogForm from '../components/BlogForm'

const BlogsList = ({ notify }) => {
  const username = useSelector(state => state.user.name)
  const blogs = useSelector(state => state.blogs)
  const bloglist = [...blogs.bloglist]
  const id = useParams().id
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)))
  }, [])

  const submitBlog = async (blog) => {
    try {
      const newBlog = await blogService.postNewBlog(blog)
      dispatch(setBlogs([...blogs.bloglist, newBlog]))
      notify(`a new blog: ${newBlog.title} was added to the list`, 3)
    } catch (error) {
      notify('error: new blogs must have a title and a valid url', 3)
    }
  }

  return (
    <div className="mt-4">
      <h2>blogs by {id}</h2>
      <ul>
        {bloglist
          .filter((blog) => blog.user.name === id)
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}><em>{blog.title}</em> by {blog.author}</Link>
            </li>
          ))
        }
      </ul>
      {id === username
        ? <BlogForm submitBlog={submitBlog} />
        : null
      }
    </div>
  )
}

export default BlogsList