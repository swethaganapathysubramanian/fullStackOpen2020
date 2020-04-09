import React, { useState, useEffect } from 'react'
import Persons from './components/Persons';
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterVal, setFilter] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
        .then(response => setPersons(response.data))
        .catch(err=> console.log(err))
  },[])

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
      axios.post('http://localhost:3001/persons',nameObj)
      .then(response=>{
        console.log(response.data)
        setPersons(persons.concat(nameObj))
      })
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