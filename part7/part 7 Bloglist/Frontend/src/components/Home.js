import React, { useState, useEffect } from 'react'
import Blog from '../components/Blog'
import blogService from '../services/blogs'
//import loginService from '../services/login'
import { logout } from '../reducers/loginReducer'
import Notification from '../components/Notification'
import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog, likeBlog, deleteTheBlog } from '../reducers/blogReducer'
import { initializeBlog } from '../reducers/blogReducer'
import Login from './Login'

const Home = ({ blogs }) => {
  const dispatch = useDispatch()
  //const [blogs, setBlogs] = useState([])
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogRef = React.createRef()
  const [update, setUpdate] = useState(0)
  //const [newBlog, setNewBlog] = useState({})
  //5.3 4/4

  useEffect(() => {
    //5.9
    dispatch(initializeBlog())
  }, [update])

  blogs = useSelector(state => state.blog)
  const loginData = useSelector(state => state.user)
  console.log(loginData)
  //5.4 1/5
  const [notification, setNotification] = useState('')
  const [type, setType] = useState('')

  //5.2 2/3

  useEffect(() => {
    const loggedOnUser = loginData
    console.log('Hello ', loggedOnUser)
    if (loggedOnUser) {
      const user = loggedOnUser
      setUser(user)
      blogService.setToken(user.token)
      setUpdate(update+1)
    }
  }, [])

  // //5.1 2/3
  // const handleLogin = async (event) => {
  //   event.preventDefault()
  //   try {
  //     const response = await loginService.login({ username, password })
  //     console.log(response.name)
  //     setUser(response)
  //     //5.2 1/3
  //   window.localStorage.setItem('loggedInUser', JSON.stringify(response))
  //     blogService.setToken(response.token)
  //   } catch (error) {
  //     //5.4 2/5
  //     setNotification(error.response.data.error)
  //     setType('error')
  //     setTimeout(() => {
  //       setNotification('')
  //       setType('')
  //     }, 5000)
  //   }
  // }


  // const handleLogin = async (username,password) => {
  //   console.log(username)
  //   try {
  //     dispatch(login(username, password))
  //     //5.2 1/3
  //   } catch (error) {
  //     //5.4 2/5
  //     console.log(error)
  //     dispatch(setNotification(error.response.data.error))
  //     dispatch(setType('error'))
  //     setTimeout(() => {
  //       dispatch(setNotification(''))
  //       dispatch(setType(''))
  //     }, 5000)
  //   }
  // }

  //5.2 3/3
  const handleLogout = (event) => {
    console.log(event)
    //event.preventDefault()
    window.localStorage.clear()
    dispatch(logout())
    //setUser(null)
  }
  //5.3 1/4
  const handleBlogSubmit = async (newBlog) => {
    blogRef.current.toggleVisibility()
    try {
      //const response = await blogService.create(newBlog)
      //console.log(response)
      dispatch(createBlog(newBlog))
      // newBlog.user=user
      //setBlogs(blogs.concat(newBlog))
      //5.4 4/5
      setNotification(`A new Blog ${newBlog.title} is added`)
      setType('notification')
      setUpdate(update + 1)
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

    dispatch(likeBlog(id, updatedBlog))
    setUpdate(update + 1)
  }
  //5.10
  const deleteBlog = async (id) => {
    const deletedBlog = blogs.filter(blog => blog.id === id)
    console.log(deletedBlog)
    //blogService.deleteBlog(id)
    try {
      await dispatch(deleteTheBlog(id))
      setType('notification')
      setNotification('Success')
      setUpdate(update + 1)
      setTimeout(() => {
        setNotification('')
        setType('')
      }, 35000)
    } catch (error) {
      console.log('hello world')
      setType('error')
      setNotification(`Failure to delete ${deletedBlog[0].title}`)
      setTimeout(() => {
        setNotification('')
        setType('')
      }, 35000)
    }

    setUpdate(update + 1)
  }
  //5.1 1/3
  if (user === null) {
    return (
      <Login handleLogout={handleLogout} />
    )
  }



  console.log('user is not null')
  return (
    <div>
      <h2>Blogs</h2>
      {/* 5.4 3/5 */}
      <Notification notification={notification} type={type} />
      <h5> Welcome {user.name}!! </h5>
      <h5>Create new Blog</h5>
      {/* 5.5 */}
      <Togglable buttonLabel='Add New Blog' ref={blogRef} closeButtonLabel='Cancel'>
        <BlogForm handleBlogSubmit={handleBlogSubmit} user={user} />
      </Togglable>
      <br />
      <div className='main'>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
        )}
      </div>
    </div>
  )
}

export default Home