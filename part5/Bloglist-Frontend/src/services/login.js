import axios from 'axios'
const baseUrl = '/api/login'
//5.1 3/3
const login = async credentials => {
  const request = axios.post(baseUrl, credentials)
  return request.then(response => response.data)
}

export default { login }