import React from 'react'
import Details from './Details'

const Country = ({result, country}) => {
    
    const list = result.filter(value => value.name.toLowerCase().includes(country.toLowerCase()));

    if(list.length > 230){
        return(
            <p>Please specify a filter</p>
        )
    }
    if(list.length === 0){
        return(
        <p>Not Available. Please specify a different filter or provide Full Name of the Country</p>
    )}
    if(list.length > 10){
        return(
            <p>Too many matches, Please specify another filter</p>
        )
    }
    else if (list.length === 1) {
        console.log('here')
        console.log(list[0])
        return(
                <Details country={list[0]} defaultShow={true} />
        )}
    else {
        return(
            list.map((country,index) => <Details key={index} country = {country} defaultShow={false}/>)
        )
    }
    
}

export default Country;
