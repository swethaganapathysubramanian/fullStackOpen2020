import React, { useState } from 'react';
import ReactDOM from 'react-dom';
const Statistics = (props) => {

      // console.log(props.total)
      if(props.total <= 0){
        return(
          <div>
            <p>No Feedback</p>
          </div>
        )
      }
      // console.log(props.score);
      const average = props.score / props.total;
      const percentage = (props.good / props.total) * 100 ;
    
      return (
        <div>
          <h1> Statistics</h1>
          <table>
          <tbody>
            <Statistic name="Good" value={props.good} />
            <Statistic name="Neutral" value={props.neutral} />
            <Statistic name="Bad" value={props.bad} />
            <Statistic name="Total" value={props.total} />
            <Statistic name="Average" value={average} />
            <Statistic name="Percentage" value={percentage} />
            </tbody>
         </table>
        </div>

      )
    }


const Statistic = (props) => {
  if(props.name === "Percentage") {
    return(
      <tr>
        <td> {props.name}</td>
        <td> {props.value}% </td>
      </tr>
    )
  }
  return(
      <tr>
        <td>{props.name} </td>
        <td> {props.value} </td>
      </tr>
  )
}

const Button = (props) => {
  return (
    <button onClick = {props.handleClick}>
      {props.text}
    </button>
  )
}


const App = () => {

  const [score,setScore] = useState(0);
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [total,setTotal] = useState(0);

  const handleGoodClick = () => {
      setScore(score + 1);
      setTotal(total + 1);
      setGood(good + 1);
  }

  const handleBadClick = () => {
      setTotal(total + 1);
      setBad(bad + 1);
      setScore(score - 1);
  }

  const handleNeutralClick = () => {
      setTotal(total + 1);
      setNeutral(neutral + 1);
  }

  
  return (
    <>
    <div>
      <h1> Give Feedback </h1>
      <Button handleClick ={handleGoodClick} text = "Good"/>
      <Button handleClick={handleNeutralClick} text="Neutral" />
        <Button handleClick={handleBadClick} text="Bad" />
    </div>
    <Statistics good = {good} bad = {bad} neutral = {neutral} score = {score} total = {total} />
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
