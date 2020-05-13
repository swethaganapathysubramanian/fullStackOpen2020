import React from 'react'
//5.4 5/5
const Notification = ({ notification, type }) => {
  if (type==='error'){
    return(
      <div className='error'>
        <h3>&nbsp;  {notification}</h3>
      </div>
    )
  } else if (type === 'notification'){
    return (
      <div className='notification'>
        <h3>  {notification}</h3>
      </div>
    )
  }
  return(
    <div>

    </div>
  )
}

export default Notification