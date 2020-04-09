import axios from 'axios'

const url = `http://localhost:3001/persons`

const getData = () => {
    const request = axios.get(url)
    return request.then(response=>response.data)
}

const addData = (nameObj) => {
    const request = axios.post(url,nameObj)
    return request.then(response => response.data)
}

const deleteData = (id) => {
    const request = axios.delete(`${url}/${id}`)
    return request.then(response => response.data)
}

export default { getData, addData, deleteData }