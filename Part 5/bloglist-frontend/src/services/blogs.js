import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postBlog = async ( newBlog ) => {
  console.log(newBlog)
  console.log(token)
 
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newBlog, config)
  console.log('Response: ', response.data)
  return response.data

}



export default { setToken, postBlog, getAll }