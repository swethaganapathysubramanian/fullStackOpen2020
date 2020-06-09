import React, { useState } from 'react'
import { useField } from './Hooks/index'

const CreateNew = (props) => {
    // const [content, setContent] = useState('')
    // const [author, setAuthor] = useState('')
    // const [info, setInfo] = useState('')
    const newcontent = useField('text')
    const newauthor = useField('text')
    const newinfo = useField('text')

    const handleSubmit = (e) => {
        e.preventDefault()
        const content = newcontent.value
        const author = newauthor.value
        const info = newinfo.value
        console.log(info)
        props.addNew({
            content,
            author,
            info,
            votes: 0
        })
    }

    const resetAll = (e) => {
        newcontent.reset()
        newauthor.reset()
        newinfo.reset()
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form >
                <div>
                    content
          <input {...newcontent} reset="hello" />
                </div>
                <div>
                    author
          <input {...newauthor} reset="hello" />
                </div>
                <div>
                    url for more info
          <input {...newinfo} reset="good bye" />
                </div>
            
            <button onClick = {handleSubmit}>Create</button>
        <button onClick = {resetAll}>Reset</button>
            </form>
        </div>
    )

}

export default CreateNew