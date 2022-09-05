import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null
const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const postNewBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const updateBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const blogUrl = baseUrl + '/' + blog.id
  const response = await axios.put(blogUrl, blog, config)
  return response.data
}

const deleteBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const blogUrl = baseUrl + '/' + blog.id
  const response = await axios.delete(blogUrl, config)
  return response.data
}

const addComment = async (blog, comment) => {
  const config = {
    headers: { Authorization: token },
  }
  const blogUrl = baseUrl + '/' + blog.id + '/comments'
  const response = await axios.post(blogUrl, { comment }, config)
  return response.data
}

export default { setToken, getAll, postNewBlog, updateBlog, deleteBlog, addComment }
