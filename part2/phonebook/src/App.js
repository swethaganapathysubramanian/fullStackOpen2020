import React, { useState } from 'react'
import Persons from './components/Persons';
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterVal, setFilter] = useState('')

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name === 'name') { setNewName(e.target.value); }
    if (e.target.name === 'number') { setNewNumber(e.target.value); }
    
  }
  
  const addName = (e) => {
    e.preventDefault();
    const nameObj = {
      name: newName,
      number: newNumber
    }
    if(persons.some(person => person.name === newName)){
      alert(`${newName} already Exists in PhoneBook`)
    } else {
        setPersons(persons.concat(nameObj))
    }
    setNewName('')
    setNewNumber('')
    setFilter('') 
  }

  const filterData = (e) => {
     setFilter(e.target.value);     
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterVal={filterVal} filterData = {filterData} />
      <h2>Add a new contact</h2>
      <PersonForm newName = {newName} newNumber={newNumber} handleChange ={handleChange} addName={addName} />
      <h2>Numbers</h2>
      <Persons persons={persons} filterVal = {filterVal}/>
    </div>
  )
}

export default App