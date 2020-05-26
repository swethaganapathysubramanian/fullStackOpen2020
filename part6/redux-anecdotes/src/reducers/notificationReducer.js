
const notificationMessage = ''
//6.10
const notificationReducer = ( state = notificationMessage, action ) => {
    switch(action.type){
        case 'SET_NOTIFICATION':
            return action.message
        default:
            return state
    }
}
//6.11
export const NotificationChange = message => {
    return {
        type: 'SET_NOTIFICATION',
        message,
    }
}
//6.18
let listOfNotifications = []
export const setNotification = (message, time) => (dispatch) =>{
    //6.21
    //for Understanding
    // The returned timeoutID is a positive 
    // integer value which identifies the timer 
    // created by the call to setTimeout(); 
    // this value can be passed to clearTimeout() to cancel the timeout.
    let timeoutID
    dispatch(NotificationChange(message))
    timeoutID = setTimeout(() => { dispatch(NotificationChange('')) }, time)
    listOfNotifications.push(timeoutID)
    if (listOfNotifications.length === 2) {
        console.log(listOfNotifications)
        clearTimeout(listOfNotifications[0])
        listOfNotifications.shift()
    }
}

export default notificationReducer