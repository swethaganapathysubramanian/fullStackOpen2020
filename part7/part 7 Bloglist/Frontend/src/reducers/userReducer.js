import userService from '../services/users'
//7.12
const userReducer = ( state = [], action ) => {
  switch(action.type){
  case 'LIST_USERS':
    return action.data
  default:
    return state
  }
}

export const listUsers = () => {
  return async dispatch => {
    const response = await userService.getUsers()

    dispatch({
      type: 'LIST_USERS',
      data: response
    })
  }
}


export default userReducer