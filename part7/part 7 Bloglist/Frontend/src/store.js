import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import blogReducer from './reducers/blogReducer'
import { notificationReducer } from './reducers/notificationReducer'
import { typeReducer } from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import loginReducer from './reducers/loginReducer'

const reducer = combineReducers({
  blog: blogReducer,
  notification: notificationReducer,
  type: typeReducer,
  users: userReducer,
  user: loginReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store