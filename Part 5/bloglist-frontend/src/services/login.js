import axios from 'axios'
const baseUrl = '/api/login'

const handleLogin = async (credentials) => {
  const response = await axios
    .post(baseUrl, credentials)
  return response.data
}

export default { handleLogin }