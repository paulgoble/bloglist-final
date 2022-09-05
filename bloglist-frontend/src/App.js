import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification, removeNotification } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'
import { Routes, Route } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import UserNavbar from './components/UserNavbar'
import UserList from './components/UserList'
import BlogsList from './components/BlogsList'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const userIsLoggedIn = window.localStorage.getItem('userObject')
    if (userIsLoggedIn) {
      const user = JSON.parse(userIsLoggedIn)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(setUser(null))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('userObject', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (error) {
      notify('error: missing or invalid credentials', 5)
    }
  }

  var timer = null
  function notify(message, duration) {
    if (timer) {
      clearTimeout(timer)
    }
    dispatch(setNotification(message))
    timer = setTimeout(() => {
      dispatch(removeNotification())
    }, duration * 1000)
  }

  const loginPage = () => (
    <div className="container mt-4">
      <h2>log in to continue...</h2>
      {notification.message ? <Notification /> : null}
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label className="mt-2">Username:</Form.Label>
          <Form.Control
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="mt-2">Password:</Form.Label>
          <Form.Control
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button className="mt-4" variant="primary" type="submit">
          login
        </Button>
      </Form>
    </div>
  )

  const blogsPage = () => (
    <div className="container">
      <UserNavbar username={user.name} handleLogout={handleLogout} />
      {notification.message ? <Notification /> : null}
      <Routes>
        <Route exact path="/" element={<UserList />} />
        <Route path="/users/:id" element={<BlogsList notify={notify}/>} />
        <Route path="/blogs/:id" element={<Blog notify={notify}/>} />
      </Routes>
    </div>
  )

  return <div>{user === null ? loginPage() : blogsPage()}</div>
}

export default App
