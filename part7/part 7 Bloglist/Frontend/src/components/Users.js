import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
//7.13
const Users = () => {

  const dispatch = useDispatch()
  dispatch(listUsers())
  const users = useSelector( state => state.users )

  return(
    <div>
      <h2>Users</h2>
      <table><tbody>
        {users.map(user => <tr key={user.id}> <td> <Link to={`/users/${user.id}`}>{user.username}</Link> </td><td>{user.blogs.length}</td> </tr> )}
      </tbody></table>
    </div>
  )
}

export default Users