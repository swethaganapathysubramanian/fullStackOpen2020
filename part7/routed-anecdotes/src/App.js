import React, { useState } from 'react'
import CreateNew from './CreateNew'
import Footer from  './Footer'
import AnecdoteList from './AnecdoteList'
import About from './About'
import Anecdote from './Anecdote'
import { BrowserRouter as Router, Route, Link, Switch, useRouteMatch, useHistory } from 'react-router-dom'

const App = () => {
  let history = useHistory();
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    console.log(anecdote)
    anecdote.id = (Math.random() * 10000).toFixed(0)
    console.log(anecdote)
    setAnecdotes(anecdotes.concat(anecdote))
    console.log(anecdotes)
    setNotification(`a new anecdote ${anecdote.content} is created!`)
    history.push('/')
    setTimeout(()=>{
      setNotification('')
    },10000)

  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const padding = {
    paddingRight: 5
  }

  // const match = useRouteMatch('/anecdote/:id')
  // const anecdote = match 
  //                  ? anecdotes.find(anecdote => anecdote.id === match.params.id) 
  //                  : null
  // console.log(anecdote)

  return (
    <div>
   
      <h1>Software anecdotes</h1>
      <Link style={padding} to="/">anecdotes</Link>
      <Link style={padding} to="/create">create new</Link>
      <Link style={padding} to="/about">about</Link>
        {notification}
      <Switch>
        <Route path='/about'>
         <About />
        </Route>
        <Route path='/create'>
          <CreateNew addNew={addNew} />
        </Route>
          <Route path='/anecdote/:id'>
            <Anecdote anecdotes={anecdotes} />
          </Route>
        <Route path='/'>
          <AnecdoteList anecdotes={anecdotes} />
         
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App;
