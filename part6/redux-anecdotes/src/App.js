import React, { useEffect } from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { initAnecdote } from './reducers/anecdoteReducer'
//6.8
const App = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
     dispatch(initAnecdote())
  },[dispatch])

  return(
  <div>
    <h2>Anecdotes</h2>
    <Notification />
    <AnecdoteList />
    <AnecdoteForm />
  </div>)
}

export default App