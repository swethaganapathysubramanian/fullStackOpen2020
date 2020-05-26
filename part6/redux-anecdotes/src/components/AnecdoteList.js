import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Filter from './Filter'

//6.8
const AnecdoteList = (props) =>{
    //6.19
    const anecdotes = props.anecdotes
    //6.18
    const vote = (anecdote) => {
        props.addVote(anecdote)
        const message = `You voted for '${anecdote.content}'`
        props.setNotification(message,5000)
    }
    //6.5
    const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
    const filter = props.filter
    const displayedAnecdotes = sortedAnecdotes.filter(Anecdote => {
        return Anecdote.content.toLowerCase().includes(filter.toLowerCase())
    })
    return (
        <div>
            <Filter />
            {/* 6.5 */} <br/>
            <h3>Anecdote List</h3>
            {displayedAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        anecdotes: state.AnecdoteList,
        filter: state.Filter
    }
}

const mapDispatchToProps = {
    setNotification,
    addVote
}

const ConnectedAnecdotes = connect(mapStateToProps,mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdotes;

// import { addVote } from '../reducers/anecdoteReducer'
// import { setNotification } from '../reducers/notificationReducer'
// import Filter from './Filter'

// const AnecdoteList = (props) => {
//     const anecdotes = useSelector(state => state.AnecdoteList)
//     const dispatch = useDispatch()
//     //6.18
//     const vote = (anecdote) => {
//         dispatch(addVote(anecdote))
//         const message = `You voted for '${anecdote.content}'`
//         dispatch(setNotification(message, 5000))
//     }
//     //6.5
//     const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
//     const filter = useSelector(state => state.Filter)
//     const displayedAnecdotes = sortedAnecdotes.filter(Anecdote => {
//         return Anecdote.content.toLowerCase().includes(filter.toLowerCase())
//     })
//     return (
//         <div>
//             <Filter />
//             {/* 6.5 */} <br />
//             <h3>Anecdote List</h3>
//             {displayedAnecdotes.map(anecdote =>
//                 <div key={anecdote.id}>
//                     <div>
//                         {anecdote.content}
//                     </div>
//                     <div>
//                         has {anecdote.votes}
//                         <button onClick={() => vote(anecdote)}>vote</button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// }