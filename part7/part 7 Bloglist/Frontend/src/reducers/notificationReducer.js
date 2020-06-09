//7.9 Redux step 1
const notificationMessage = ''

export const notificationReducer = (state = notificationMessage, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.message
  default:
    return state
  }
}

export const setNotification = message => {
  return {
    type: 'SET_NOTIFICATION',
    message,
  }
}

export const typeReducer = (state = notificationMessage, action) => {
  switch (action.type) {
  case 'SET_TYPE':
    return action.notification_type
  default:
    return state
  }
}

export const setType = notification_type => {
  return {
    type: 'SET_TYPE',
    notification_type
  }
}

//export default { notificationReducer, typeReducer }