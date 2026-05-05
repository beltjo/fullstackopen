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
  console.log('TODO')
}



export default { setToken, postBlog, getAll }