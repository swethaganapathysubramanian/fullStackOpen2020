import React from 'react'

const Notificaition = ({message, type}) => {

    if (message === null){
        return null
    }
    
    else {
        if(type==='notification'){
        return(
            <div className="notification">
                {message}
            </div>
        )}
        else{
            return(
        <div className = "error">
            { message }
        </div>

    )}
}
}

export default Notificaition;