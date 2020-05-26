import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

//6.20 6.12
const Filter = (props) => {
    
    const handleChange = (event) => {
        props.filterChange(event.target.value)
    }
    const style = {
        marginBottom: 5,
        marginTop:30
    }

    return (
        <div style={style}>
            Filter <input onChange={handleChange} />
        </div>
    )
}

const mapDispatchToProps = {
    filterChange
}

const ConnectedFilter = connect(null,mapDispatchToProps)(Filter)

export default ConnectedFilter


// import React from 'react'
// import { useDispatch } from 'react-redux'
// import { filterChange } from '../reducers/filterReducer'

// //6.12
// const Filter = () => {
//     const dispatch = useDispatch()
//     const handleChange = (event) => {
//         dispatch(filterChange(event.target.value))
//     }
//     const style = {
//         marginBottom: 5,
//         marginTop: 30
//     }

//     return (
//         <div style={style}>
//             Filter <input onChange={handleChange} />
//         </div>
//     )
// }

// export default Filter