import axios from 'axios'

//make app work with backend 3.9 and proxy added to package.json
const url = `/api/persons`

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

const updateData = (id, newData) => {
    const request = axios.put(`${url}/${id}`, newData)
    return request.then(response => response.data)
}

export default { getData, addData, deleteData, updateData }