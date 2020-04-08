import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Country from './Country'

function App() {

  const [country, setCountry] = useState('')
  const [result, setResult] = useState([])
  const [search, setSearch] = useState('')
 

  useEffect(()=>{
    const url = `https://restcountries.eu/rest/v2/all`
    //console.log(url)
    axios.get(url).then(response => {
      //console.log(response.data)
      displayResult(response.data)
  })
    
  },[country])
  
  const handleEntry = (e) => {
    e.preventDefault();
    setCountry(search)
  }
  
  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value)
  }

  const displayResult = (input) => {
    setResult(input);
  }

  return (
    <div>
    <form onSubmit={handleEntry}>
      Find Countries: <input onChange={handleChange}/><br/>
      </form>
      <Country result = {result} country = {country} />
      
    </div>
  );
}

export default App;
