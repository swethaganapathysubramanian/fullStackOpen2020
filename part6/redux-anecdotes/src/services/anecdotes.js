import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'
//6,13
const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}
//6.14
const createNew = async (newObject) =>{
    const response = await axios.post(baseUrl, newObject)
    return response.data
}   
//6.17
const update = async (id, newObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, newObject)
    return response.data
}

export default { getAll, createNew, update }
