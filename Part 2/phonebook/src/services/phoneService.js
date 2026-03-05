import axios from "axios"

const baseURL = "http://localhost:3001/persons"

const getNumbers = () => {
    return axios
        .get(baseURL)
        .then(response => {
            return response.data
        })
}

const postNumber = (newPhoneNumber) => {
    return axios
        .post(baseURL, newPhoneNumber)
        .then(response => {
            return response.data
        })
}

const deleteNumber = (id) => {
    return axios
        .delete(`${baseURL}/${id}`)
        .then(response => {
            return response.data
        })
}

const putNumber = (id, phoneNumber) => {
    return axios
        .put(`${baseURL}/${id}`, phoneNumber)
        .then(response => {
            return response.data
        })
}

export default {postNumber, getNumbers, deleteNumber, putNumber}