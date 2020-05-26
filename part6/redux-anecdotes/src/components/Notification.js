import React from 'react'
import { useSelector } from 'react-redux'

//6.10 6.11
const Notification = () => {
  const notification = useSelector(state=>state.Notification)
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if(notification === ''){
    return(
      <div></div>
    )
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification