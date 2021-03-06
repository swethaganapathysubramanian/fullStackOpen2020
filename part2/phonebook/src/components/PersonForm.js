import React from 'react'

const PersonForm = ({addName, newName, handleChange, newNumber}) => {
    return(
    <form onSubmit={addName}>
        <div>
            <div>Name: <input name="name" value={newName} onChange={handleChange} required/></div>
            <div>Number: <input name="number" value={newNumber} onChange={handleChange} required/></div>
            <div><button type="submit">add</button></div>
        </div>
    </form>
    )
}

export default PersonForm;