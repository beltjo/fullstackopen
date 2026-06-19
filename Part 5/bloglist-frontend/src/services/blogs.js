import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log('GetAll response:')
  console.log(response)
  return response.data
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

const LikeBlog = async ( blog ) => {
  console.log(blog)

  const newBlog = {
    likes: blog.likes + 1,
    id: blog.id
  }

  console.log(newBlog)
  const response = await updateBlog(newBlog)
  console.log('LikeBlog Response: ', response)
  return response
}

const updateBlog = async ( newBlog ) => {
  console.log('Preparing to put blog:', newBlog)

  const config = {
    headers: { Authorization : token }
  }
  console.log('Sending request to ', `${baseUrl}/${newBlog.id}`)
  const response = await axios.put(`${baseUrl}/${newBlog.id}`, newBlog, config)
  console.log('UpdateBlog Response: ', response.data)
  return response.data
}

const deleteBlog = async (blog) => {
  console.log('Preparing to delete blog: ', blog)

  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${blog.id}`, blog, config)
  console.log('Delete Response: ', response.data)
  return response.data
}


export default { setToken, postBlog, getAll, LikeBlog, deleteBlog }