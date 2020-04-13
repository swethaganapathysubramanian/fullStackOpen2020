import React, { useState, useEffect } from 'react'
import Persons from './components/Persons';
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/Person'
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterVal, setFilter] = useState('')
  const [message,setMessage] = useState(null)
  const [type, setType] = useState(null)

  useEffect(() => {
    personService.getData()
        .then(personList => setPersons(personList))
        .catch(err=> console.log(err))
  },[])

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name === 'name') { setNewName(e.target.value); }
    if (e.target.name === 'number') { setNewNumber(e.target.value); }
    
  }
  
  const addName = (e) => {
    e.preventDefault();

    if (newName === ' '){
      alert("Enter Name")
    }

    else if(newNumber === ' '){
      alert("Enter Number")
    }
    else {
      const nameObj = {
          name: newName,
          number: newNumber
    }
    
    if(persons.some(person => person.name === newName)){
        const obj = persons.find(person => person.name === newName)
        if(obj.number !== newNumber){
          var decision = window.confirm(`${obj.Name} is already added to Phonebook. Replace old number with new Number?`)
          
          if(decision){
          const changedObj = {...obj, number: newNumber}
          personService.updateData(obj.id, changedObj)
          .then(updatedData=> {
          setPersons(persons.map(person => person.id !== obj.id? person: updatedData))
            setMessage(`${newName}'s number is updated in the Phonebook`)
            setType('notification')
            setTimeout(() => {
              setMessage(null)
              setType(null)
            }, 5000)
          })
          }
        }
        else if (obj.number === newNumber || newNumber === ' '){
        alert(`${newName} already Exists in PhoneBook`)
        } 
    }
    else {
      personService.addData(nameObj)
      .then(result=>{
        console.log(result)
        setPersons(persons.concat(nameObj))
        setMessage(`${newName} is added to the Phonebook`)
        setType('notification')
        setTimeout(() => {
          setMessage(null)
          setType(null)
        }, 5000)
      })
    }

    setNewName('')
    setNewNumber('')
    setFilter('') 
  }
}

  const deletePerson = (id) => {
      const deletedPerson = persons.find(person => person.id === id)
       console.log(id)
       personService.deleteData(id)
      .then(setPersons(persons.filter(person=> person.id !== id)))
         .catch(error => {
           setMessage(
             `Information '${deletedPerson.name}' was already removed from server`
           )
           setType('error')
           setTimeout(() => {
             setMessage(null)
             setType(null)
           }, 5000)

         })
  }

  const filterData = (e) => {
     setFilter(e.target.value);     
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={type} />
      <Filter filterVal={filterVal} filterData = {filterData} />
      <h2>Add a new contact</h2>
      <PersonForm newName = {newName} newNumber={newNumber} handleChange ={handleChange} addName={addName} />
      <h2>Numbers</h2>
      <Persons persons={persons} filterVal = {filterVal} deletePerson = {deletePerson}/>
    </div>
  )
}

export default App