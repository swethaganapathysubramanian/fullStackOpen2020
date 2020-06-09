import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { likeBlog, initializeBlog, addCommentReducer } from '../reducers/blogReducer'
//import { useDispatch, useSelector } from 'react-redux'
import { connect } from 'react-redux'
import blogService from '../services/blogs'
//7.15
const BlogData = ({ blogs, likeBlog, addCommentReducer, user }) => {
  initializeBlog()
  const [update,setUpdate] = useState(0)
  const [blogList, setBlogs] = useState(blogs)
  const [comment, setComment] = useState('')
  //const [blog, setBlog] = useState('')
  //console.log('before',blogList)
  const id = useParams().id
  let blog
  useEffect( () => {
    const callthis = async () => {
      const List = await blogService.getAll()
      setBlogs(List)
      //console.log('List', blogList)
    }
    callthis()
  },[update])


  blog = blogList.find(blog => blog.id === id)
  //console.log(blog)

  if(!blog){
    return null
  }

  const addLike = () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }
    likeBlog(blog.id, updatedBlog)
    //initializeBlog()
    setUpdate(update+1)
    //history.push(`/blogs/${blog.id}`)
  }
  //7.17
  const addCommentData = () => {
    //blogService.addComment(blog.id, comment)
    addCommentReducer(blog.id, comment)
    //console.log('Done')
    setComment('')
    initializeBlog()
    blog.comments.concat(comment)
    setUpdate(update + 2)
    console.log(update)
  }

  return(
    <div className='Blog'>
      <h2>{blog.title} by {blog.author} </h2>
      <a href={blog.url}>{blog.url}</a><br/>
      {blog.likes} <button onClick={addLike}>Like</button> <br />
      {blog.user.username}<br/>
      added by { user.username }
      <br/>
      <h3> Comments</h3>
      <ul>
        {blog.comments.map((comment,index) => comment ? <li key={ index }> { comment } </li> : <></>) }
      </ul>
      <input type = 'text' value= { comment } onChange = {({ target }) => setComment(target.value)}></input>
      <button onClick={ addCommentData } type='submit'>Add Comment </button> <br />
    </div>

  )
}

const mapStateToProps = (state) => ({ blogs: state.blog, user: state.user })

const mapDispatchToProps = {
  likeBlog, initializeBlog, addCommentReducer
}

const connectedBlog = connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogData)

export default connectedBlog

// const BlogData = ({ blogs }) => {
//   const dispatch = useDispatch()

//   const history = useHistory()

//   const id = useParams().id
//   const blog = blogs.find(blog => blog.id === id)

//   console.log(useSelector(state => state.blog))

//   const addLike = () => {
//     const updatedBlog = {
//       title: blog.title,
//       author: blog.author,
//       url: blog.url,
//       likes: blog.likes + 1
//     }
//     dispatch(likeBlog(blog.id, updatedBlog))
//     history.push(`/blogs/${blog.id}`)
//   }
//   return (
//     <div className='Blog'>
//       <h2>{blog.title} by {blog.author} </h2>
//       {blog.url}<br />
//       {blog.likes} <button onClick={addLike}>Like</button> <br />
//       {blog.user.username}<br />
//     </div>

//   )
// }


// export default BlogData
