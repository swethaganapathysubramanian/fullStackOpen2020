import React from 'react'

const PersonForm = ({addName, newName, handleChange, newNumber}) => {
    return(
    <form onSubmit={addName}>
        <div>
            <div>name: <input name="name" value={newName} onChange={handleChange} /></div>
            <div>number: <input name="number" value={newNumber} onChange={handleChange} /></div>
            <div><button type="submit">add</button></div>
        </div>
    </form>
    )
}

export default PersonForm;