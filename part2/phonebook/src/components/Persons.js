import React from 'react'


const Persons = ({persons, filterVal, deletePerson }) => {
    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filterVal.toLowerCase()));
    
    const handleDelete = (id, name) => {
        const decision = window.confirm(`Delete ${name}?`);
        if (decision) {
            deletePerson(id);
        } else {
            console.log("Do not Delete")
        }
    }

    return(
        <div>
        {filteredPersons.map(person => 
            <p key={person.name}>
        { person.name } { person.number } <button onClick = {()=>handleDelete(person.id, person.name)}> Delete!</button>
        </p>)}
        </div>
    )
}

export default Persons;