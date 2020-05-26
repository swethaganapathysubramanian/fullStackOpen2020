import anecdoteService from '../services/anecdotes'
const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const reducer = (state = [], action) => {
  //6.3
  if (action.type === 'VOTE'){
    return state.map(anecdote => anecdote.id !== action.data.id ? anecdote: action.data.changedAnecdote)
  }
  //6.4
  else if(action.type === 'ADD'){
    return state.concat(action.data)
  }
  else if (action.type === 'INIT-ANECDOTES')
    return action.data

  else{
    return state
  }
} 
//6.4 6.16
export const createAnecdote = (content) => (dispatch) => {
  anecdoteService.createNew(content).then(dispatch({ type: 'ADD', data: content }))
} 
//6.6 6.17
export const addVote = (anecdote) => (dispatch) => {
  const id = anecdote.id
  const changedAnecdote = {
      ...anecdote,
      votes: anecdote.votes+1
    }
  anecdoteService.update(anecdote.id, changedAnecdote).then(dispatch({ type: 'VOTE', data: { id, changedAnecdote }}))
}
//6.13
export const initAnecdote = (anecdotes) => (dispatch) => {
  anecdoteService
    .getAll().then(anecdotes => dispatch({ type:'INIT-ANECDOTES', data:anecdotes }))
}

export default reducer