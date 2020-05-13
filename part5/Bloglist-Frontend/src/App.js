import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogRef = React.createRef()
  const [update, setUpdate] = useState(0)
  //const [newBlog, setNewBlog] = useState({})
  //5.3 4/4

  //5.4 1/5
  const [notification, setNotification] = useState('')
  const [type, setType] = useState('')

  useEffect(() => {
    //5.9
    async function fetchBlogs() {
      const nonSortedBlogs = await blogService.getAll()
      const sortedBlogs = nonSortedBlogs.sort((a,b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    }
    fetchBlogs()
  }, [update])
  //5.2 2/3
  useEffect( () => {
    const loggedOnUser = window.localStorage.getItem('loggedInUser')
    if(loggedOnUser){
      const user = JSON.parse(loggedOnUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])
  //5.1 2/3
  const handleLogin =  async (event) => {
    event.preventDefault()
    try{
      const response = await loginService.login({ username, password })
      console.log(response.name)
      setUsername('')
      setPassword('')
      setUser(response)
      //5.2 1/3
      window.localStorage.setItem('loggedInUser', JSON.stringify(response))
      blogService.setToken(response.token)
    } catch (error){
      //5.4 2/5
      setNotification(error.response.data.error)
      setType('error')
      setTimeout(() => {
        setNotification('')
        setType('')
      }, 5000)
    }
  }
  //5.2 3/3
  const handleLogout = (event) => {
    console.log(event)
    //event.preventDefault()
    window.localStorage.clear()
    setUser(null)

  }
  //5.3 1/4
  const handleBlogSubmit = async (newBlog) => {
    blogRef.current.toggleVisibility()
    try{
      const response = await blogService.create(newBlog)
      console.log(response)
      newBlog.user=user
      setBlogs(blogs.concat(newBlog))
      //5.4 4/5
      setNotification(`A new Blog ${newBlog.title} is added`)
      setType('notification')
      setTimeout(() => {
        setNotification('')
        setType('')
      }, 5000)
    } catch (error) {
      console.log(error)
    }
  }
  //5.8
  const updateBlog = (id, updatedBlog) => {
    const oldblog = blogs.filter(blog => blog.id === id)
    blogService.update(id, updatedBlog)
      .then(response => oldblog.likes = response.likes)
      .catch(err => console.log(err))
    setUpdate(update+1)
  }
  //5.10
  const deleteBlog = (id) => {
    const deletedBlog = blogs.filter(blog => blog.id === id)
    console.log(deletedBlog)
    blogService.deleteBlog(id)
      .then(response => {
        setBlogs(blogs.filter(blog => blog.id !== id))
        console.log(response)
      })
      .catch(err => {
        setType('error')
        console.log(err)
        setNotification('Unable to Delete')
      })
  }
  //5.1 1/3
  if(user === null){
    return(
      <div>
        <h2>Login into Application</h2>
        <Notification notification={notification} type={type} />
        <form>
          Username: <input
            type="text"
            id="username"
            value={ username }
            name="username"
            onChange={ ({ target }) => setUsername(target.value)
            } /> <br /> <br />
        Password: <input
            type="password"
            id="password"
            value={ password }
            name="password"
            onChange={({ target }) => setPassword(target.value) } /> <br /> <br />

          <button id="submit" onClick={ handleLogin }>Submit</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      {/* 5.4 3/5 */}
      <Notification notification = {notification} type={type}/>
      <h3>{user.name} has logged in <button onClick={ handleLogout } id='logout'>Logout</button></h3>
      <h2>Create new Blog</h2>
      {/* 5.5 */}
      <Togglable buttonLabel = 'Add New Blog' ref={blogRef} closeButtonLabel= 'Cancel'>
        <BlogForm handleBlogSubmit={handleBlogSubmit} user={user}/>
      </Togglable>
      <br/>
      <div className='main'>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
        )}
      </div>
    </div>
  )
}

export default App