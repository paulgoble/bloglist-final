import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const addUser = (user) => {
  const request = axios.post(baseUrl, user)
  return request.then((response) => response.data)
}

const updateUser = (user) => {
  const request = axios.put(baseUrl, user)
  return request.then((response) => response.data)
}

export default { getAll, addUser, updateUser }
