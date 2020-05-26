import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

//6.4 6.20 6.7
const AnecdoteForm = (props) =>{

    
    //6.14
    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        if(content !== ''){
        event.target.anecdote.value = ''
        const newObject = {
            content: content,
            votes: 0
        }
        props.createAnecdote(newObject)
        //6.18
        const message = `${content} is added to the list`
        props.setNotification(message, 5000)
    }
    }

    return (
        <div>
        <h3> Add new anecdote</h3>
        <form onSubmit={addAnecdote}>
            <input name="anecdote" />
            <button type="submit">add</button>
        </form>
        </div>
    )

}
const mapDispatchToProps = {
    createAnecdote,
    setNotification
}
const ConnectedForm = connect(null,mapDispatchToProps)(AnecdoteForm)

export default ConnectedForm
// import React from 'react'
// import { useDispatch } from 'react-redux'
// import { createAnecdote } from '../reducers/anecdoteReducer'
// import { setNotification } from '../reducers/notificationReducer'

// //6.4
// const NewAnecdote = (props) => {

//     const dispatch = useDispatch()
//     //6.14
//     const addAnecdote = (event) => {
//         event.preventDefault()
//         const content = event.target.anecdote.value
//         if (content !== '') {
//             event.target.anecdote.value = ''
//             const newObject = {
//                 content: content,
//                 votes: 0
//             }
//             dispatch(createAnecdote(newObject))
//             //6.18
//             const message = `${content} is added to the list`
//             dispatch(setNotification(message, 5000))
//         }
//     }

//     return (
//         <div>
//             <h3> Add new anecdote</h3>
//             <form onSubmit={addAnecdote}>
//                 <input name="anecdote" />
//                 <button type="submit">add</button>
//             </form>
//         </div>
//     )

// }

// export default NewAnecdote