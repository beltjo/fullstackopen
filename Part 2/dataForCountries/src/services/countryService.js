import axios from 'axios'

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/'

const downloadAllData = () => {
    const allURL = `${baseURL}/api/all`

    return axios
        .get(allURL)
        .then((response) => {
            return response.data
        })    
}

export default {downloadAllData}