import blogService from '../services/blogs'
//7.9
const blogReducer = (state = [], action) => {
  switch(action.type){
  case 'NEW_BLOG':
    return state.concat(action.data)
  case 'INIT_BLOGS':
    return action.data
  case 'RETURN_BLOGS':
    console.log('hello', action.data)
    return action.data
  case 'LIKE_BLOG':
    return state.map( blog => blog.id === action.data.id ? action.data.updatedBlog : blog)
  case 'COMMENT_BLOG':
    //console.log(action.data)
    return state
  case 'DELETE_BLOG':
    return state.filter(blog => blog.id !== action.data)
  case 'DELETE_BLOG_ERROR':
    return state
  default:
    return state
  }
}
//7.10
export const createBlog = (newBlog) => {
  return async dispatch => {
    blogService.create(newBlog).then(dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    }))

  }
}
//7.11
export const likeBlog = (id, updatedBlog) => {
  return dispatch => {
    blogService.update(id, updatedBlog).then(dispatch({
      type: 'LIKE_BLOG',
      data: { id, updatedBlog }
    }))
  }
}
//7.18
export const addCommentReducer = (id, comment) => {
  //console.log('here')
  return async dispatch => {
    //console.log('govinda govinda')
    const data = await blogService.addComment(id, comment)
    dispatch({
      type: 'COMMENT_BLOG',
      data: data
    })
  }
}

export const returnAll = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    console.log(blogs)
    dispatch({
      type: 'RETURN_BLOGS',
      data: blogs,
    })
  }
}
//7.11
export const deleteTheBlog = (id) => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id
    })
  }
}

export const initializeBlog = () => {
  return async dispatch => {
    const nonSortedBlogs = await blogService.getAll()
    const blogs = nonSortedBlogs.sort((a, b) => b.likes - a.likes)
    //console.log(blogs)
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export default blogReducer