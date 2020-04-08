import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Details = ({country, defaultShow}) => {
    
    var api_key = process.env.REACT_APP_APIKEY;
    const [weatherData,setWeatherData] = useState([])

    const [show, setShow] = useState(false);

    const query = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`

    useEffect(()=>{
        axios.get(query).then(response => { 
                    console.log(response.data)
                    setWeatherData(response.data)
                    if (defaultShow) { setShow(true) }
                })
    },[show])

    return(
        show ?
        <div>
                <h2>{country.name} <button onClick={() => setShow(!show)}>Hide</button></h2>
            Capital {country.capital} <br />
            Population {country.population}
            <div>
                <h4>Languages</h4>
                {country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
            </div><br></br><br></br>
            <div>
                <img src={country.flag} alt="flag" height="150px" width="auto"></img>
            </div><br/><br/>
            <div>
                Current Temp : {weatherData.current.temperature} Celcius <br/><br/>
                <img src={weatherData.current.weather_icons[0]} alt="img" height="100px" width="100"></img><br/>
                <br/> wind: {weatherData.current.wind_speed} in direction {weatherData.current.wind_dir}
            </div>
        </div> 
        :
        <p key={country.name}>{country.name} <button onClick={()=>setShow(!show)}>Show</button></p>
    )
}

export default Details;