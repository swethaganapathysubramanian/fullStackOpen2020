import loginService from '../services/login'
import { setToken } from '../services/blogs'

const initialState = JSON.parse(window.localStorage.getItem('loggedInUser'))
console.log(initialState)
const loginReducer = ( state = initialState , action ) => {
  switch (action.type){
  case 'LOGIN_SUCCESS': {
    const user = action.data
    console.log('login', user)
    window.localStorage.setItem('loggedInUser', JSON.stringify(user))
    setToken(action.data.token)
    return user
  }
  case 'LOGOUT': {
    window.localStorage.removeItem('loggedInUser')
    const user = null
    return user
  }
  default:
    return state
  }
}

export const login = (username, password) => {
  return async dispatch => {
    console.log(username, password)
    try{
      const response = await loginService.login({ username, password })
      console.log(response)
      dispatch({
        type: 'LOGIN_SUCCESS',
        data: response
      })
    } catch(error){
      console.log(error.response.data.error)
    }
  }
}

export const logout = () => {
  return async dispatch => {
    dispatch({
      type: 'LOGOUT'
    })
  }
}


export default loginReducer
