import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom:10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [show,setShow] = useState(false)

  const toggleShow = (event) => {
    event.preventDefault()
    setShow(!show)
  }
  //5.8
  const addLike = () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1
    }
    updateBlog(blog.id, updatedBlog)
  }
  //5.10
  const removeBlog = (event) => {
    event.preventDefault()
    const decision = window.confirm(`Remove Blog ${blog.title} by ${blog.author}`)
    if(decision){
      deleteBlog(blog.id)
    }
  }
  return(
    //5.7
    show?
      <div style={blogStyle} className='showBlog Blog'>
        {blog.title} by {blog.author}<button onClick={toggleShow}>Hide</button> <br />
        {blog.url}<br/>
        {/* 5.8 */}
        {blog.likes} <button onClick={addLike}>Like</button> <br />
        {blog.user.username}<br/>
        <button onClick={removeBlog} id='remove'>Remove</button>
      </div>
      :
      <div style={blogStyle} className='defaultBlog Blog'>
        {blog.title} by {blog.author}  <button onClick={toggleShow}>Show</button>
      </div>
  )
}
//5.11
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog
