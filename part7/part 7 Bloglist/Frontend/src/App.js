import React, { useEffect } from 'react'
import Home from './components/Home'
import User from './components/User'
import Users from './components/Users'
import Login from './components/Login'
import BlogData from './components/BlogData'
import Navigationbar from './components/Navigationbar'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlog } from './reducers/blogReducer'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { logout } from './reducers/loginReducer'
import './App.css'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    //5.9
    dispatch(initializeBlog())
  }, [dispatch])

  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blog)

  const handleLogout = (event) => {
    console.log(event)
    //event.preventDefault()
    window.localStorage.clear()
    dispatch(logout())
    //setUser(null)
  }

  return (
    <div>
      <Router>
        <h1>Blog List App</h1>
        {user ? <Navigationbar handleLogout={handleLogout} />:<></> }
        {/* <Link style={padding} to="/">Blogs</Link>
        <Link style={padding} to="/Users">Users</Link> */}
        <div className='App'>
          {/* <Notification /> */}
          <Switch>
            <Route exact path='/login'>
              {user ? <Redirect to="/" /> : <Login />}
            </Route>
            <Route exact path='/users'>
              {user ? <Users /> : <Redirect to="/login"/> }
            </Route>
            <Route path='/users/:id'>
              {user ? <User users = {users}/> : <Redirect to="/login" />}
            </Route>
            <Route path='/blogs/:id'>
              {user ? <BlogData blogs={blogs} /> : <Redirect to="/login" />}
            </Route>
            <Route path='/'>
              {user ? <Home blogs={blogs}/> : <Redirect to="/login" />}
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  )
}


export default App