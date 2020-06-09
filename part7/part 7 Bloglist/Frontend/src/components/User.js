import React from 'react'
import { useParams } from 'react-router-dom'
//7.14
const User = ({ users }) => {
  const id = useParams().id
  const user = users.find(user => user.id === id )
  if (!user) {
    return null
  }

  return (
    <>
      <h2> {user.username} </h2>
      <h6> Added Blogs </h6>
      <table><tbody>
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </tbody></table>
    </>
  )
}

export default User