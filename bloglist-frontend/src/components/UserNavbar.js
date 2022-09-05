import { Link } from 'react-router-dom'
import { Navbar, Button, Container } from 'react-bootstrap'

const UserNavbar = ({ username, handleLogout }) => (
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
      <Link to={`/users/${username}`}>blogs</Link>
      <Link to="/">users</Link>
      <Navbar.Text>logged in as: <b>{username}</b></Navbar.Text>
      <Button size="sm" variant="danger" onClick={handleLogout}>log out</Button>
    </Container>
  </Navbar>
)

export default UserNavbar