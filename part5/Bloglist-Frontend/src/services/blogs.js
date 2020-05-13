import axios from 'axios'
const baseUrl = '/api/blogs'

let Token = null

const setToken = newToken => {
  Token = `bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
//5.3 3/4
const create = newBlog => {
  const config = {
    headers: { Authorization: Token },
  }
  const request = axios.post(baseUrl, newBlog, config)
  return request.then(response => response.data)
}
//5.8
const update = (id, updatedBlog) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedBlog)
  return request.then(response => response.data)
}

const deleteBlog = id => {
  const config = {
    headers: { Authorization: Token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

export default { getAll, create, setToken, update, deleteBlog }