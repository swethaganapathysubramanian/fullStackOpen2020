import React from 'react'
import Person from './Person'

const Persons = ({persons, filterVal}) => {
    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filterVal.toLowerCase()));
    
    return(
        <div>
            <table>
            <tbody>
            {filteredPersons.map(person=><Person key= {person.name} name={person.name} number ={person.number} />)}
            </tbody>
            </table>
        </div>
    )
}

export default Persons;