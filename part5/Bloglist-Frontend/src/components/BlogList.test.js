import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('5.13, 5.14, 5.15', () => {

  let component
  const likeMockHandler = jest.fn()
  const deleteMockHandler = jest.fn()
  beforeEach(() => {
    const blogData = {
      title: 'Hello World',
      author: 'swetha',
      url: 'www.livetoeat.com',
      likes: 5,
      user:{ username:'swetha' }
    }

    component = render(<Blog blog={blogData} updateBlog={likeMockHandler} deleteBlog={deleteMockHandler} />)
  })

  test('initial Blog Display Title and Author only', () => {
    const div = component.container.querySelector('div')
    expect(div).toHaveClass('defaultBlog')
  })

  test('Click show button', () => {
    const showButton = component.getByText('Show')
    fireEvent.click(showButton)
    const div = component.container.querySelector('div')
    expect(div).toHaveClass('showBlog')
  })

  test('Click like button', () => {
    const showButton = component.getByText('Show')
    fireEvent.click(showButton)
    const likeButton = component.getByText('Like')
    //const div = component.container.querySelector('div')
    expect(likeButton).toBeDefined()
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(likeMockHandler.mock.calls).toHaveLength(2)
  })
})

describe('5.16', () => {

  test('newBlog submitted calls Submit handler', () => {
    const handleBlogSubmitMockHandler = jest.fn()
    const component = render(<BlogForm handleBlogSubmit={handleBlogSubmitMockHandler} />)
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')
    fireEvent.change(title, {
      target: { value: 'Test title' }
    })
    fireEvent.change(author, {
      target: { value: 'Test author' }
    })
    fireEvent.change(url, {
      target: { value: 'Test url' }
    })
    fireEvent.submit(form)
    expect(handleBlogSubmitMockHandler.mock.calls).toHaveLength(1)
    expect(handleBlogSubmitMockHandler.mock.calls[0][0].title).toBe('Test title' )
    expect(handleBlogSubmitMockHandler.mock.calls[0][0].author).toBe('Test author')
    expect(handleBlogSubmitMockHandler.mock.calls[0][0].url).toBe('Test url')
  })
})