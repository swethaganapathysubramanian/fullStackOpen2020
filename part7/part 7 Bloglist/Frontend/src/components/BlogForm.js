import React, { useState } from 'react'

const BlogForm = ({ handleBlogSubmit }) => {
  //5.6
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    setTitle('')
    setAuthor('')
    setUrl('')
    handleBlogSubmit(newBlog)
  }

  return(
    <form onSubmit={addBlog}> {/*5.3 2/4*/}
        Title: <input
        id="title"
        type="text"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />  <br /> <br />
        Author: <input
        id="author"
        type="text"
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />  <br /> <br />
        Url: <input
        id="url"
        type="text"
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      />  <br /> <br />
      <button>Submit</button>
    </form>
  )
}

export default BlogForm