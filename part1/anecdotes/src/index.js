import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(6).fill(0))
  const [max, setMax] = useState(0);

  const selectRandom = () => {
    setSelected(Math.floor(Math.random()*Math.floor(6))); 
  }

  const updateVote = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setVotes(votesCopy);
    setMax(votesCopy.indexOf(Math.max(...votesCopy)));
  }

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      {props.anecdotes[selected]} <br/>
      <p> has {votes[selected]} votes</p>
      <button onClick={updateVote} > Vote </button>
      <button onClick = {selectRandom} > Get Random Quote </button>
      <br/>
      <br/>
      <div>
      <h1>Anecdote with Most number of Votes</h1>
        {props.anecdotes[max]} <br />
        <p> has {votes[max]} votes</p>
      </div>
      
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)