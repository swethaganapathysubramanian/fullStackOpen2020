import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
// import Notification from './Notification'
// import blogService from '../services/blogs'
// import loginService from '../services/login'
import { setNotification, setType } from '../reducers/notificationReducer'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginintoApp = async (event) => {
    console.log(username)
    event.preventDefault()
    try {
      dispatch(login(username,password))
      history.push('/')
      //5.2 1/3
    } catch (error) {
      //5.4 2/5
      console.log(error)
      dispatch(setNotification(error.response.data.error))
      dispatch(setType('error'))
      setTimeout(() => {
        dispatch(setNotification(''))
        dispatch(setType(''))
      }, 5000)
    }
  }
  // const loginintoApp = (event) => {
  //   event.preventDefault()
  //   handleLogin(username, password)
  // }

  //5.2 3/3
  // const handleLogout = (event) => {
  //   console.log(event)
  //   //event.preventDefault()
  //   window.localStorage.clear()
  //   setUser(null)
  // }

  return(
    <div>
      <h2>Login into Application</h2> <br/>
      <form>
        Username: <input
          type="text"
          id="username"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)
          } /> <br /> <br />
        Password: <input
          type="password"
          id="password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)} /> <br /> <br />

        <button id="submit" onClick={loginintoApp}>Submit</button>
      </form>
    </div>
  )
}

export default Login