import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification, setType } from '../reducers/notificationReducer'
import Alert from 'react-bootstrap/Alert'

//5.4 5/5
const Notification = ({ notification, type }) => {
  const dispatch = useDispatch()

  dispatch(setNotification(notification))
  dispatch(setType(type))

  const message = useSelector(state => state.notification)
  const typeVal = useSelector(state => state.type)
  //7.19 7.20
  if (typeVal ==='error'){
    return(
      <Alert variant='danger'>
        {message}
      </Alert>
    )
  } else if (typeVal === 'notification'){
    return (
      <Alert variant='success'>
        {message}
      </Alert>
    )
  }
  return(
    <div>

    </div>
  )
}

export default Notification