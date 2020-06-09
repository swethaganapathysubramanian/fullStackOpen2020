import blogReducer from './blogReducer'
import blogService from '../services/blogs'
import deepFreeze from 'deep-freeze'

describe('Blog Reducer', () => {
  test('returns new state with action NEW_BLOG', () => {
    const state = []
    const action = {
      type: 'NEW_BLOG',
      data: {
        title: 'Hello World',
        author: 'Manish',
        url: 'www.manish.com'
      }
    }

    deepFreeze(state)
    const newState = blogReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(action.data)
  })

  test('initialize', async () => {
    const state = []
    const notes = await blogService.getAll()
    const action = {
      type: 'INIT_BLOGS',
      data: notes,
    }
    deepFreeze(state)
    const newState = blogReducer(state, action)

    expect(newState).toHaveLength(18)
  })
})