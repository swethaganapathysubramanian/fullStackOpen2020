const filter = ''
//6.12
const filterReducer = (state = filter, action) =>{
    switch(action.type){
        case 'SET-FILTER':
            return action.value
        default:
            return state
    }
}

export const filterChange = (filter) =>{
    return {
        type: 'SET-FILTER',
        value: filter
    }
}

export default filterReducer