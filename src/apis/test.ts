import axios from 'axios'

export function getList() {
  return axios.post('http://localhost:3000/api/users')
}
