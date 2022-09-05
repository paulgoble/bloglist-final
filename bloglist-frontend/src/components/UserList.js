import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setAllUsers } from '../reducers/allUsersReducer'
import usersService from '../services/users'
import Table from 'react-bootstrap/Table'

const UserList = () => {
  const users = useSelector(state => state.allUsers.userlist)
  const dispatch = useDispatch()

  useEffect(() => {
    usersService.getAll().then((users) => dispatch(setAllUsers(users)))
  }, [])

  return (
    <div>
      <h2>users</h2>
      <Table striped bordered>
        <thead>
          <tr>
            <th></th>
            <th>blogs</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.name}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default UserList