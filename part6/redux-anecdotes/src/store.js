import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
//6.9
const rootReducer = combineReducers({
    AnecdoteList: reducer, 
    Notification: notificationReducer,
    Filter: filterReducer
})
//6.15
const store = createStore(rootReducer,applyMiddleware(thunk))
console.log(store.getState())

export default store